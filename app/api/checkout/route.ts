// Meraboco. Created by s.kenichi
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: Request) {
    try {
        const { priceId, email } = await req.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error("[Stripe API] Error: STRIPE_SECRET_KEY is not defined in .env");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        if (!priceId) {
            console.error("[Stripe API] Error: priceId is missing in request body");
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        console.log(`[Stripe API] Creating session for: ${email}, Price: ${priceId}`);

        // Stripe Checkout Sessionの作成
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${req.headers.get("origin")}/portal/thanks?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get("origin")}/#pricing`,
            customer_email: email,
        });

        return NextResponse.json({ checkoutUrl: session.url });
    } catch (error: any) {
        console.error("[Stripe API] Global Error:", error.message);
        // クライアント側で "Unexpected end of JSON" にならないよう、必ずJSON形式でエラーを返す
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
