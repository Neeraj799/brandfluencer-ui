import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.endsWith('/login')) {
    return NextResponse.next();
  }
  
  const role  = token?.user.role
  console.log(role,'session');

  if (role === 'brand') {
    if (pathname.includes('/brandfluencer')) {
      return Response.redirect(new URL("/brandfluencer/login", req.url));
    }
  }

  if (role === 'brandfluencer') {
    if (pathname.includes('/brand/')) {
      return Response.redirect(new URL("/brand/login", req.url));
    }
  }



  if (!token && !pathname.endsWith('/login')) {
    const user = pathname.split("/").slice(2, 3)[0];
    if (user === "brand") {
      return Response.redirect(new URL("/brand/login", req.url));
    }else if (user === "brandfluencer") {
    return Response.redirect(new URL("/brandfluencer/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
