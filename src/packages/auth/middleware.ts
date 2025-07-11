import { betterFetch } from '@better-fetch/fetch';
import { NextRequest, NextResponse } from 'next/server';
export async function betterAuthMiddleware(req: NextRequest, publicRoutes: string[]) {
  if (
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/handlers') ||
    req.nextUrl.pathname.startsWith('/cron')
  ) {
    return NextResponse.next();
  }
  const { data: session } = await betterFetch<any>('/api/v1/auth/get-session', {
    baseURL: req.nextUrl.origin,
    headers: {
      cookie: req.headers.get('cookie') || '',
    },
  });
  if (req.nextUrl.pathname == '/call') {
    return NextResponse.next();
  }
  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (
    session &&
    session.user.role === 'UNDEFINED' &&
    req.nextUrl.pathname !== '/select-role' &&
    req.nextUrl.pathname !== '/onboarding'
  ) {
    return NextResponse.redirect(new URL(`/select-role?userId=${session.user.id}`, req.url));
  }

  if (session && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
