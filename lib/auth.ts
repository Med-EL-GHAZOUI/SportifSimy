import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "@prisma/client";

export const AUTH_COOKIE = "SportifSimy_token";

export type SessionUser = {
  id: string;
  email: string;
  role: Role;
  coachId: string | null;
  mustChangePassword: boolean;
};

const encoder = new TextEncoder();

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters.");
  }
  return encoder.encode(secret);
}

export async function signSession(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(token?: string): Promise<SessionUser | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return {
      id: String(payload.id),
      email: String(payload.email),
      role: payload.role as Role,
      coachId: payload.coachId ? String(payload.coachId) : null,
      mustChangePassword: Boolean(payload.mustChangePassword)
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(AUTH_COOKIE)?.value);
}

export async function getUserFromRequest(request: NextRequest) {
  return verifySessionToken(request.cookies.get(AUTH_COOKIE)?.value);
}

export function canAccessClient(user: SessionUser, clientId: string) {
  if (user.role === "CLIENT") return user.id === clientId;
  return true;
}
