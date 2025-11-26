import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const protectedPaths = [
    '/profile',
    '/main',
    '/documents',
    '/trade_union_member',
    '/trade_union_registration',
    '/tariffs',
    '/benefits',
    '/news',
    '/promos',
    '/colleagues',
  ];

  const isPathProtected = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  const token =
    (await getToken({ req, secret: process.env.AUTH_SECRET })) ||
    req.cookies.get('token')?.value;

  if (isPathProtected && !token) {
    const url = new URL('/signin', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === '/' && token) {
    const url = new URL('/main', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
