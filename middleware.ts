import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  // if (!req.auth && req.nextUrl.pathname !== '/dashboard') {
  //   const newUrl = new URL('/login', req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
  const headers = new Headers(req.headers);
  headers.set('next-url-pathname', req.nextUrl.pathname);
  return NextResponse.next({ headers });
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
