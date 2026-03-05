import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabaseAdmin } from "@/lib/supabase/admin"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {

        const session = event.data.object as Stripe.Checkout.Session
        const email = session.customer_email
        const plan = session.metadata?.plan || "lite"

        if (!email) {
            return NextResponse.json({ received: true })
        }

        const { data: existingUser } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle()

        let userId = existingUser?.id

        if (!userId) {

            const { data, error } =
                await supabaseAdmin.auth.admin.createUser({
                    email,
                    email_confirm: true,
                })

            if (error || !data.user) {
                return NextResponse.json({ error: "user create failed" }, { status: 500 })
            }

            userId = data.user.id
        }

        await supabaseAdmin
            .from("users")
            .upsert({
                id: userId,
                email,
                plan,
                stripe_customer_id: session.customer as string,
            })

        if (session.subscription) {

            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            )

            await supabaseAdmin
                .from("subscriptions")
                .upsert({
                    user_id: userId,
                    stripe_subscription_id: subscription.id,
                    status: subscription.status,
                    current_period_end: new Date(
                        ((subscription as any).current_period_end || 0) * 1000
                    ).toISOString(),
                })
        }
    }

    return NextResponse.json({ received: true })
}
