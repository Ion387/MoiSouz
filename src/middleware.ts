import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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

  const isPathProtected = protectedPaths?.some((path) =>
    pathname.includes(path),
  );
  const res = NextResponse.next();
  const token =
    (await getToken({ req, secret: process.env.AUTH_SECRET })) ||
    req.cookies.get('token')?.value;

  if (isPathProtected) {
    if (!token) {
      const url = new URL(`/signin`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  if (pathname === '/') {
    if (token) {
      const url = new URL(`/main`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
