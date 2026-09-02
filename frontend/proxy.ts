import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "merchantos_token";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/catalog",
  "/campaigns",
  "/checkout",
  "/audit",
  "/chat",
  "/settings",
];

const AUTH_PAGES = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = Boolean(
    request.cookies.get(COOKIE_NAME)?.value
  );

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const isAuthPage = AUTH_PAGES.some((page) =>
    pathname.startsWith(page)
  );

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/catalog/:path*",
    "/campaigns/:path*",
    "/checkout/:path*",
    "/audit/:path*",
    "/chat/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};