import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"
import { Resend } from "resend"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "")
const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
)

type CustomerUpsertInput = {
  stripeCustomerId: string
  email: string | null
  subscriptionStatus: string
  planId: string | null
}

async function fetchCustomerEmail(
  customerId: string | null | undefined,
  fallback?: string | null
): Promise<string | null> {
  if (fallback) return fallback
  if (!customerId) return null

  const customer = await stripe.customers.retrieve(customerId)
  if (customer && typeof customer !== "string") {
    return customer.email ?? null
  }

  return null
}

async function upsertCustomerRecord(payload: CustomerUpsertInput) {
  const emailFilter = payload.email ? `email.eq.${payload.email}` : ""
  const orFilter = [emailFilter, `stripeCustomerId.eq.${payload.stripeCustomerId}`]
    .filter(Boolean)
    .join(",")

  const { data: existing, error: existingError } = await supabase
    .from("customers")
    .select("tenantId,email")
    .or(orFilter)
    .maybeSingle()

  if (existingError) {
    throw new Error("Failed to check existing customer")
  }

  const tenantId = existing?.tenantId ?? randomUUID()
  const email = payload.email || existing?.email

  if (!email) {
    throw new Error("Customer email is required")
  }

  const { error: upsertError } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        stripeCustomerId: payload.stripeCustomerId,
        subscriptionStatus: payload.subscriptionStatus,
        planId: payload.planId,
        tenantId,
        updatedAt: new Date().toISOString(),
      },
      { onConflict: "email" }
    )

  if (upsertError) {
    throw new Error("Failed to upsert customer record")
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id

  if (!stripeCustomerId) {
    throw new Error("Missing Stripe customer id")
  }

  const subscription = subscriptionId
    ? await stripe.subscriptions.retrieve(subscriptionId)
    : null

  const email = await fetchCustomerEmail(
    stripeCustomerId,
    session.customer_details?.email ?? session.customer_email
  )

  await upsertCustomerRecord({
    stripeCustomerId,
    email,
    subscriptionStatus: subscription?.status ?? "active",
    planId: subscription?.items.data[0]?.price?.id ?? null,
  })

  if (email && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: "メラボコ <info@meraboco.jp>",
        to: [email],
        subject: "ご契約ありがとうございます",
        html: `
          <div style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif; line-height: 1.8;">
            <p>この度はご契約いただきありがとうございます。</p>
            <p>ご契約内容の確認と次のご案内は、追ってご連絡いたします。</p>
          </div>
        `,
      })
    } catch {
      console.error("[stripe-webhook] Thank you email failed")
    }
  }
}

async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  const stripeCustomerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id

  if (!stripeCustomerId) {
    throw new Error("Missing Stripe customer id")
  }

  const email = await fetchCustomerEmail(stripeCustomerId)

  await upsertCustomerRecord({
    stripeCustomerId,
    email,
    subscriptionStatus: subscription.status,
    planId: subscription.items.data[0]?.price?.id ?? null,
  })
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("[stripe-webhook] Missing Stripe env configuration")
    return new NextResponse("Server misconfigured", { status: 500 })
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[stripe-webhook] Missing Supabase env configuration")
    return new NextResponse("Server misconfigured", { status: 500 })
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    console.warn("[stripe-webhook] Missing signature header")
    return new NextResponse("Bad request", { status: 400 })
  }

  const body = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.warn("[stripe-webhook] Signature verification failed")
    return new NextResponse("Invalid signature", { status: 400 })
  }

  console.info("[stripe-webhook] Received event", { type: event.type, id: event.id })

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await handleSubscriptionEvent(event.data.object as Stripe.Subscription)
        break
      }
      default:
        console.info("[stripe-webhook] Ignored event", { type: event.type })
    }
  } catch (error) {
    console.error("[stripe-webhook] Handler failed", { type: event.type, id: event.id })
    return new NextResponse("Webhook handler error", { status: 500 })
  }

  console.info("[stripe-webhook] Event processed", { type: event.type, id: event.id })
  return NextResponse.json({ received: true })
}
