import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const CANONICAL_HOST = 'businesssortedkent.co.uk';

export async function middleware(request: NextRequest) {
  // ── Crawler / infra files: serve directly on any host, no redirect ──
  // These are crawler infrastructure, not page content, and should resolve
  // 200 on both apex and www so tools that fetch them without following a
  // cross-host redirect (some SEO crawlers, agent fetchers) get the file.
  // This bypass MUST run before the www→apex canonicalisation below, which
  // is confirmed (via an x-mw-fired probe, 2026-06-02) to fire in middleware
  // — so the 301 it produces is what was sending these files to apex on www.
  const pathname = request.nextUrl.pathname;
  const isInfraPath =
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    pathname.startsWith('/.well-known/');
  if (isInfraPath) {
    return NextResponse.next();
  }

  // ── Domain canonicalisation: www → non-www (301 permanent) ──
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  // ── Auth routes: run Supabase session check ──
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin-dashboard') || request.nextUrl.pathname.startsWith('/api/elle-logs')
  const isClientRoute = request.nextUrl.pathname.startsWith('/client-dashboard')

  if (!isAuthRoute && !isAdminRoute && !isClientRoute) {
    return NextResponse.next()
  }

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

  // Not authenticated
  if (!user && (isAdminRoute || isClientRoute)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Already authenticated, trying to access login
  if (user && isAuthRoute) {
    const role = user.app_metadata?.role
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/client-dashboard', request.url))
  }

  // Authenticated user trying to access admin
  if (user && isAdminRoute) {
    const role = user.app_metadata?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Domain canonicalisation: match ALL routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)',
  ],
}
