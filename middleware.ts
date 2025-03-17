import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/servicehub/:path*', '/api/tickets', '/api/comments'],
};

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname;
  
  if(token) {

    const role = token.role;
    
    if(path === 'api/logs'){
      const key = request.headers.get('x-secret-key');
      if(key === process.env.SECRET_KEY){
        return NextResponse.next();
      }else{
        return NextResponse.json({ error: "Invalid secret key" }, { status: 405 });      }
    }

    if(path.startsWith('/api')){
      return NextResponse.next();
    }

    if(role === "ADMIN"){
      if(path.startsWith("/servicehub/admin")) return NextResponse.next();

      return NextResponse.redirect(new URL("/servicehub/admin", request.url))
    }

    if(role === "SUPPORT") {
      if(path.startsWith("/servicehub/support")) return NextResponse.next();

      return NextResponse.redirect(new URL("/servicehub/support", request.url))
    }

    if (role === "CUSTOMER") {
      if (path.startsWith("/servicehub/admin") || path.startsWith("/servicehub/support")) {
        return NextResponse.redirect(new URL("/servicehub", request.url)); 
      }

      if (path.startsWith("/servicehub")) {
        return NextResponse.next();
      }
    
      return NextResponse.redirect(new URL("/servicehub", request.url));
    }

    if(role === "ADMIN") {
      return NextResponse.redirect(new URL("/servicehub/admin", request.url))
    }

    if(role === "SUPPORT") {
      return NextResponse.redirect(new URL("/servicehub/support", request.url))
    }

    if(role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/servicehub", request.url))
    }

    // if(token?.role === 'ADMIN') {
    //   return req.nextUrl.pathname.startsWith('/servicehub/admin');
    // }

    // if(token?.role === 'SUPPORT') {
    //   return req.nextUrl.pathname.startsWith('/servicehub/support');
    // }

    // if(token?.role === 'CUSTOMER') {
    //   return !(/\/(admin|support)/.test(req.nextUrl.pathname));
    // }

    // return 
  }
  const redirectUrl = new URL("/login", request.url);
  if(path) {
    redirectUrl.searchParams.set("callbackUrl", path)
  }
  return NextResponse.redirect(redirectUrl);
}
 