import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

function logoutRedirect(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set(AUTH_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}

export async function GET(request: Request) {
  return logoutRedirect(request);
}

export async function POST(request: Request) {
  return logoutRedirect(request);
}
