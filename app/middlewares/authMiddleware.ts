import { NextResponse, NextRequest } from "next/server";
import type { NextFetchEvent } from "next/server";
import { getToken } from "next-auth/jwt";
import { CustomMiddleware } from "./chain";

export const authMiddleware = (
  middleware: CustomMiddleware
): CustomMiddleware => {
  return async (
    req: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.endsWith("/login")) {
      return NextResponse.next();
    }

    const role = token?.user.role;

    if (role === "brand") {
      if (pathname.includes("/brandfluencer")) {
        return Response.redirect(new URL("/brandfluencer/login", req.url));
      }
    }

    if (role === "brandfluencer") {
      if (pathname.includes("/brand/")) {
        return Response.redirect(new URL("/brand/login", req.url));
      }
    }

    if (!token && !pathname.endsWith("/login")) {
      const user = pathname.split("/").slice(2, 3)[0];
      if (user === "brand") {
        return Response.redirect(new URL("/brand/login", req.url));
      } else if (user === "brandfluencer") {
        return Response.redirect(new URL("/brandfluencer/login", req.url));
      }
    }

    return middleware(req, event, response);
  };
};

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
