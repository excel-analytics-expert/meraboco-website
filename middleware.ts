import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * [ボルトの正確な設置]
 * /admin 以下の全てのディレクトリを監視対象とし、
 * 有効なセッション（認証）がないアクセスは例外なく /login へ強制リダイレクトする。
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
      },
    }
  )

  // 認証状態の厳格な確認
  const { data: { session } } = await supabase.auth.getSession()

  // 判定ロジック：/admin へのアクセス時、セッション未保持なら即時排除
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  // 監視対象を /admin 以下の全パスに限定してボルトを締める
  matcher: ['/admin/:path*'],
}
