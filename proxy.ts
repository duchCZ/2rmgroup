import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic edge gate: bounce anonymous visitors away from /admin before the
// page renders. The authoritative check still happens server-side in the admin
// layout (which also enforces the admin role).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: ["/admin/:path*"],
};
