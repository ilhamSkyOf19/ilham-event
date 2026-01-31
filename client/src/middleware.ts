import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./configs/environment";

export async function middleware(request: NextRequest) {
  // get token
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  // pathname
  const { pathname } = request.nextUrl;

  // cek pathname
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    // jika ada token, redirect ke dashboard
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // cek pathname protected
  if (pathname.startsWith("/admin")) {
    if (!token) {
      // generate url
      const url = new URL("/auth/login", request.url);

      // add search params
      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    console.log("token:", token);

    // cek role
    if (token.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // cek pathname protected member
  if (pathname.startsWith("/member")) {
    if (!token) {
      // generate url
      const url = new URL("/auth/login", request.url);

      // add search params
      url.searchParams.set("callbackUrl", encodeURI(request.url));

      return NextResponse.redirect(url);
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }
  }
}

// config
export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
