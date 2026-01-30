import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(`${origin}/portal/login`)
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("[portal-callback] Auth exchange failed", { code: error.code })
    return NextResponse.redirect(`${origin}/portal/login`)
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
  return NextResponse.redirect(`${siteUrl}/portal/dashboard`)
}
