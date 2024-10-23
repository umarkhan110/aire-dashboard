import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const url = req.nextUrl.clone();
  const role = req.cookies.get('role');

  if (token) {
    if (url.pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/company', req.url));
    }
    if (url.pathname.startsWith('/company') && role !== 'company') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }else {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/company/:path*'],
};
