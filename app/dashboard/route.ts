import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin

    if (!code) {
        return NextResponse.redirect(`${siteUrl}/portal/login`)
    }

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
        console.error("[dashboard-callback] Auth exchange failed", { code: error.code })
        return NextResponse.redirect(`${siteUrl}/portal/login`)
    }

    return NextResponse.redirect(`${siteUrl}/portal/dashboard`)
}
