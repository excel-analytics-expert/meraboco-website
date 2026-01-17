import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Rate limiting: simple in-memory store (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT = 5 // Max requests per window
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.lastReset > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Input validation
function validateInput(data: {
  name: string
  email: string
  company?: string
  message: string
}): { valid: boolean; error?: string } {
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "名前は2文字以上で入力してください" }
  }
  if (data.name.length > 100) {
    return { valid: false, error: "名前は100文字以内で入力してください" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: "有効なメールアドレスを入力してください" }
  }
  if (data.email.length > 254) {
    return { valid: false, error: "メールアドレスが長すぎます" }
  }

  // Company validation (optional)
  if (data.company && data.company.length > 200) {
    return { valid: false, error: "会社名は200文字以内で入力してください" }
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: "お問い合わせ内容は10文字以上で入力してください" }
  }
  if (data.message.length > 5000) {
    return { valid: false, error: "お問い合わせ内容は5000文字以内で入力してください" }
  }

  // Spam detection: check for suspicious patterns
  const spamPatterns = [
    /\[url=/i,
    /\[link=/i,
    /<a\s+href=/i,
    /viagra|cialis|casino|lottery|winner/i,
  ]
  for (const pattern of spamPatterns) {
    if (pattern.test(data.message) || pattern.test(data.name)) {
      return { valid: false, error: "不正なコンテンツが検出されました" }
    }
  }

  return { valid: true }
}

// Sanitize input
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown"

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "リクエスト制限を超えました。しばらく時間をおいてから再度お試しください。" },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate input
    const validation = validateInput({ name, email, company, message })
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Sanitize input
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      company: company ? sanitize(company) : null,
      message: sanitize(message),
    }

    // Save to Supabase
    const { data: insertedData, error: supabaseError } = await supabase
      .from("contacts")
      .insert([
        {
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company,
          message: sanitizedData.message,
          ip_address: ip,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (supabaseError) {
      console.error("Supabase error:", supabaseError)
      // Continue even if Supabase fails - still send email
    }

    // Send email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "メラボコ <noreply@meraboco.com>",
      to: ["kenboukulilin@gmail.com"],
      replyTo: sanitizedData.email,
      subject: `【メラボコ】お問い合わせ: ${sanitizedData.name}様`,
      html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; text-align: center;">
              新しいお問い合わせ
            </h1>
          </div>
          
          <div style="background: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #666;">
                  お名前
                </td>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
                  ${sanitizedData.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">
                  メール
                </td>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${sanitizedData.email}" style="color: #0066cc;">
                    ${sanitizedData.email}
                  </a>
                </td>
              </tr>
              ${sanitizedData.company ? `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">
                  会社名
                </td>
                <td style="padding: 15px 0; border-bottom: 1px solid #eee;">
                  ${sanitizedData.company}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 15px 0; font-weight: bold; color: #666; vertical-align: top;">
                  お問い合わせ内容
                </td>
                <td style="padding: 15px 0;">
                  <div style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">
${sanitizedData.message}
                  </div>
                </td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
              <p>このメールはメラボコのウェブサイトから送信されました</p>
              <p>送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (emailError) {
      console.error("Resend error:", emailError)
      return NextResponse.json(
        { error: "メールの送信に失敗しました。しばらく時間をおいてから再度お試しください。" },
        { status: 500 }
      )
    }

    // Send auto-reply to customer
    await resend.emails.send({
      from: "メラボコ <noreply@meraboco.com>",
      to: [sanitizedData.email],
      subject: "【メラボコ】お問い合わせありがとうございます",
      html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif; line-height: 1.8; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; text-align: center;">
              お問い合わせありがとうございます
            </h1>
          </div>
          
          <div style="background: #fff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 12px 12px;">
            <p>${sanitizedData.name} 様</p>
            
            <p>この度はメラボコへお問い合わせいただき、誠にありがとうございます。</p>
            
            <p>以下の内容でお問い合わせを受け付けいたしました。<br>
            担当者より2営業日以内にご連絡させていただきますので、今しばらくお待ちください。</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #666; font-size: 14px;">お問い合わせ内容</h3>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${sanitizedData.message}</p>
            </div>
            
            <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin-bottom: 5px; font-weight: bold;">メラボコ</p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                〒107-0061 東京都港区北青山1-3-3<br>
                TEL: 050-1793-1290<br>
                Email: meraboco.2025.8@gmail.com<br>
                Web: https://meraboco.jp
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json(
      { success: true, message: "お問い合わせを受け付けました" },
      { status: 200 }
    )

  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。しばらく時間をおいてから再度お試しください。" },
      { status: 500 }
    )
  }
}
