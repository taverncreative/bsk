import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin-dashboard') || request.nextUrl.pathname.startsWith('/api/elle-logs')
  const isClientRoute = request.nextUrl.pathname.startsWith('/client-dashboard')

  // Not authenticated
  if (!user && (isAdminRoute || isClientRoute)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already authenticated, trying to access login
  if (user && isAuthRoute) {
    const role = user.user_metadata?.role
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/client-dashboard', request.url))
  }

  // Authenticated user trying to access admin
  if (user && isAdminRoute) {
    const role = user.user_metadata?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/client-dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/client-dashboard/:path*',
    '/login',
    '/api/elle-logs',
  ],
}
