import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("nihongo_session")?.value;

  let sessionUser: { email?: string; role?: string; name?: string } | null = null;
  if (sessionCookie) {
    try {
      sessionUser = JSON.parse(decodeURIComponent(sessionCookie));
    } catch {
      sessionUser = null;
    }
  }

  // 1. Admin route protection: strictly requires verified session with role === 'admin'
  if (pathname.startsWith("/admin")) {
    if (!sessionUser) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (sessionUser.role !== "admin") {
      // Forbidden: redirect student to portal
      const portalUrl = new URL("/portal", req.url);
      portalUrl.searchParams.set("error", "unauthorized_admin_access");
      return NextResponse.redirect(portalUrl);
    }
  }

  // 2. Student portal route protection: strictly requires active user session
  if (pathname.startsWith("/portal")) {
    if (!sessionUser) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
