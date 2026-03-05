// Meraboco. Created by s.kenichi
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import Stripe from "stripe";

// 環境変数の浄化（不要な空白等の除去）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim() || "";

// 安定したクライアントの強制（Fetch APIの使用とリトライ回数設定）
const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-01-27.acacia" as any,
    maxNetworkRetries: 3,
    httpClient: Stripe.createFetchHttpClient()
});

export async function POST(req: Request) {
    try {
        const { priceId, email } = await req.json();

        if (!stripeSecretKey) {
            console.error("[Stripe API] Error: STRIPE_SECRET_KEY is not defined in .env");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        if (!priceId) {
            console.error("[Stripe API] Error: priceId is missing in request body");
            return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
        }

        console.log(`[Stripe API] Creating session for: ${email}, Price: ${priceId}`);

        // 環境変数の浄化（ベースURL）
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.NEXT_PUBLIC_URL?.trim() || req.headers.get("origin") || "";

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
            success_url: `${siteUrl}/portal/thanks?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/#pricing`,
            customer_email: email,
        });

        return NextResponse.json({ checkoutUrl: session.url });
    } catch (error: any) {
        console.error("[Stripe API] Global Error:", error.message);

        // Vercelログ調査用の詳細出力を強化
        console.error('STRIPE_CONNECTION_ERROR_DETAIL:', error);

        // クライアント側で "Unexpected end of JSON" にならないよう、必ずJSON形式でエラーを返す
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
