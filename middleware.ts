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

  // ── Programmatic "-near-" alias redirect: /{service}-near-{town} → /{service}-{town} (301) ──
  // Crawler / Wix-era "-near-" variants of our service×town slugs (260 of them in
  // the GSC 404 export, e.g. /web-design-near-ashford) are not real routes — the
  // grid intentionally never generates "-near-" pages — so they 404. Every one
  // collapses to a live canonical page at /{service}-{town}, so strip the "-near-"
  // infix and 301 to it. This sits AFTER the www→apex block so host canonicalisation
  // stays the outermost gate; the target host is pinned to the apex regardless, so
  // the redirect is a single clean hop on the canonical host. No DB lookup here (the
  // matcher runs on every request) — all 260 known targets are live, and a bogus
  // "-near-" input just degrades to a normal 404, no worse than today. The
  // x-near-redirect header is an observable probe to confirm this rule actually
  // fired (never trust an unprobed routing change — early curls can hit the old build).
  const nearMatch = pathname.match(/^\/([a-z0-9-]+)-near-([a-z0-9-]+)\/?$/);
  if (nearMatch) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = '';
    url.pathname = `/${nearMatch[1]}-${nearMatch[2]}`;
    const res = NextResponse.redirect(url, 301);
    res.headers.set('x-near-redirect', '1');
    return res;
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
