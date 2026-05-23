import { NextRequest, NextResponse } from "next/server";

export async function readBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export function wantsJson(request: NextRequest) {
  return request.headers.get("content-type")?.includes("application/json") || request.headers.get("accept")?.includes("application/json");
}

export function redirectBack(request: NextRequest, fallback = "/") {
  return NextResponse.redirect(request.headers.get("referer") ?? new URL(fallback, request.url));
}
