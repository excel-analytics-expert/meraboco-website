import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { z } from "zod"

const LeadSchema = z.object({
    email: z.string().email(),
    url: z.string().url(),
    source: z.string().optional().default("LP_Diagnostic")
})

// Vercel Serverless Function lifecycle scoped memory
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 min
const MAX_REQUESTS = 3 // 3 requests per min

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
        const attempts = rateLimitMap.get(ip) || 0

        if (attempts >= MAX_REQUESTS) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }

        rateLimitMap.set(ip, attempts + 1)
        setTimeout(() => {
            const current = rateLimitMap.get(ip)
            if (current && current > 0) rateLimitMap.set(ip, current - 1)
        }, RATE_LIMIT_WINDOW)

        const body = await req.json()
        const parsed = LeadSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 })
        }

        const { email, url, source } = parsed.data

        const supabase = await createSupabaseServerClient()

        // 匿名(anon)insertのみ許可。RLSで防御済み。
        const { error } = await supabase.from("leads").insert([{ email, url, source }])

        if (error) {
            // ログへの出力（PIIやDB詳細）はすべて除外
            return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}
