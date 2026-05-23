import { NextRequest } from "next/server";
import type { Role } from "@prisma/client";
import { error } from "@/lib/api";
import { getUserFromRequest, type SessionUser } from "@/lib/auth";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(request: NextRequest, limit = 60, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > limit) {
    return error("Too many requests", 429);
  }

  return null;
}

export async function requireAuth(request: NextRequest, roles?: Role[]): Promise<SessionUser | Response> {
  const limited = rateLimit(request);
  if (limited) return limited;

  const user = await getUserFromRequest(request);
  if (!user) return error("Authentication required", 401);
  if (roles && !roles.includes(user.role)) return error("Insufficient permissions", 403);
  return user;
}

export function sanitizeText(value: string) {
  return value.trim().replace(/[<>]/g, "");
}
