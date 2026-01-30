"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

type MagicLinkState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function sendMagicLink(
  _prevState: MagicLinkState,
  formData: FormData
): Promise<MagicLinkState> {
  const email = String(formData.get("email") || "").trim()

  if (!email) {
    return { status: "error", message: "メールアドレスを入力してください。" }
  }

  const supabase = await createSupabaseServerClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteUrl}/portal/callback`,
    },
  })

  if (error) {
    console.error("[portal-login] Magic link send failed", { code: error.code })
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    }
  }

  return {
    status: "success",
    message: "送信しました。メール内のリンクからログインしてください。",
  }
}
