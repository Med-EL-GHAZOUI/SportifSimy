import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

const publicRoutes = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname === "/" || publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const isProtectedAppRoute =
    pathname.startsWith("/client") ||
    pathname.startsWith("/coach") ||
    pathname.startsWith("/api");

  if (!isProtectedAppRoute) return NextResponse.next();

  const user = await getUserFromRequest(request);
  if (!user) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/coach") && user.role !== "COACH") {
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  if (pathname.startsWith("/client") && user.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/coach/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/client/:path*", "/coach/:path*", "/api/:path*"]
};
