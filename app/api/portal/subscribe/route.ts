import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"
import { randomUUID } from "crypto"
import { microcmsClient } from "@/lib/microcms"
import type { MicroCmsPricingPlan } from "@/types/microcms"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "")
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
)

function toJstIsoString(date: Date) {
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000)
  return jst.toISOString().replace("Z", "+09:00")
}

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe設定が不完全です。" }, { status: 500 })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Supabase設定が不完全です。" }, { status: 500 })
  }
  if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
    return NextResponse.json({ error: "microCMS設定が不完全です。" }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 })
  }

  const {
    planId,
    email,
    name,
    agreeTerms,
    agreePrivacy,
    agreeCommerce,
    agreePublicOrder,
    agreeNoRefund,
  } = body

  if (
    !planId ||
    !email ||
    !name ||
    !agreeTerms ||
    !agreePrivacy ||
    !agreeCommerce ||
    !agreePublicOrder ||
    !agreeNoRefund
  ) {
    return NextResponse.json({ error: "必須項目をご確認ください。" }, { status: 400 })
  }

  const plan = await microcmsClient.getListDetail<MicroCmsPricingPlan>({
    endpoint: "plans",
    contentId: planId,
  })

  if (!plan?.stripePriceId) {
    return NextResponse.json({ error: "プラン情報が不足しています。" }, { status: 400 })
  }

  const now = new Date()
  const signedAt = toJstIsoString(now)
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"

  const { data: existing } = await supabase
    .from("customers")
    .select("tenantId")
    .eq("email", email)
    .maybeSingle()

  const tenantId = existing?.tenantId ?? randomUUID()

  const { error: upsertError } = await supabase
    .from("customers")
    .upsert(
      {
        email,
        stripeCustomerId: null,
        subscriptionStatus: "pending",
        planId: plan.planId ?? plan.id,
        tenantId,
        updatedAt: now.toISOString(),
        agreement_name: name,
        agreement_email: email,
        agreement_signed_at: signedAt,
        agreement_timezone: "Asia/Tokyo",
        agreement_ip: ip,
        agreement_plan_id: plan.id,
        agreement_terms: true,
        agreement_privacy: true,
        agreement_commerce: true,
        agreement_prohibited_use: true,
        agreement_no_refund: true,
      },
      { onConflict: "email" }
    )

  if (upsertError) {
    return NextResponse.json({ error: "合意情報の保存に失敗しました。" }, { status: 500 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: plan.stripePriceId, quantity: 1 }],
    success_url: `${origin}/portal/dashboard?checkout=success`,
    cancel_url: `${origin}/plans?checkout=cancelled`,
    metadata: {
      planId: plan.id,
      agreementSignedAt: signedAt,
    },
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
