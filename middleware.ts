import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/portal")) {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  if (pathname.startsWith("/portal/callback")) {
    return response
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && pathname !== "/portal/login") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/portal/login"
    return NextResponse.redirect(redirectUrl)
  }

  if (user && pathname === "/portal/login") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/portal/dashboard"
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ["/portal/:path*"],
}
