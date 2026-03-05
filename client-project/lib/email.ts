import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/client'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface WelcomeEmailData {
    email: string
    plan: string
    pdfUrl: string
}

/**
 * ウェルカムメール + Magic Link + 契約書PDFを送信
 */
export async function sendWelcomeEmail({ email, plan, pdfUrl }: WelcomeEmailData) {
    const planName = plan === 'lite' ? 'Lite プラン' : plan === 'standard' ? 'Standard プラン' : 'Pro プラン'

    // Magic Link を生成（Supabase）
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
        },
    })

    if (error) {
        console.error('[Magic Link Generation Error]:', error)
    }

    // メール送信
    try {
        await resend.emails.send({
            from: 'Meraboco <info@meraboco.jp>',
            to: email,
            subject: `【Meraboco】ご契約ありがとうございます（${planName}）`,
            html: `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.8;
              color: #333;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            h1 {
              color: #0ea5e9;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
              color: white !important;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: bold;
            }
            .info-box {
              background: #f0f9ff;
              border-left: 4px solid #0ea5e9;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 12px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>ご契約ありがとうございます</h1>
            
            <p>この度は、Meraboco の <strong>${planName}</strong> をご契約いただき、誠にありがとうございます。</p>
            
            <div class="info-box">
              <strong>📋 契約内容</strong><br>
              プラン: ${planName}<br>
              契約日: ${new Date().toLocaleDateString('ja-JP')}<br>
              メールアドレス: ${email}
            </div>

            <p><strong>次のステップ:</strong></p>
            <ol>
              <li>下記のボタンから購入者専用ダッシュボードにログイン</li>
              <li>契約書PDFをダウンロード・保管</li>
              <li>サイト作成を開始</li>
            </ol>

            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/login" class="button">
              ダッシュボードにログイン
            </a>

            <div class="info-box">
              <strong>📄 契約書PDF</strong><br>
              契約書は以下のリンクからダウンロードできます:<br>
              <a href="${pdfUrl}" target="_blank">契約書をダウンロード</a><br>
              <small>※ダッシュボードからもいつでも閲覧できます</small>
            </div>

            <p><strong>🤖 AIサポートについて</strong></p>
            <p>
              ダッシュボード内のAIサポート機能では、以下の質問にお答えします:<br>
              - 画像のアップロード方法<br>
              - 文字の変更方法<br>
              - レイアウトの調整方法
            </p>

            <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>

            <div class="footer">
              <strong>メラボコ（Meraboco）</strong><br>
              代表: 栗林 加奈子<br>
              〒107-0061 東京都港区北青山1-3-3三橋ビル3F<br>
              TEL: 050-1793-1290<br>
              Email: info@meraboco.jp<br>
              Web: https://meraboco.jp<br><br>
              © 2026 Meraboco. Created by s.kenichi
            </div>
          </div>
        </body>
        </html>
      `,
        })

        console.log('[Welcome Email] Sent successfully to:', email)
    } catch (error) {
        console.error('[Welcome Email Error]:', error)
        throw error
    }
}
