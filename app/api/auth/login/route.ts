import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AUTH_COOKIE, signSession } from "@/lib/auth";
import { error, handleApiError, ok } from "@/lib/api";
import { loginSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/security";
import { readBody, wantsJson } from "@/lib/request";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 8, 60_000);
    if (limited) return limited;

    const input = loginSchema.parse(await readBody(request));
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user || !user.isActive) return error("Invalid credentials", 401);

    const validPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!validPassword) return error("Invalid credentials", 401);

    const token = await signSession({
      id: user.id,
      email: user.email,
      role: user.role,
      coachId: user.coachId,
      mustChangePassword: user.mustChangePassword
    });

    const response = wantsJson(request) ? ok({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        mustChangePassword: user.mustChangePassword
      }
    }) : NextResponse.redirect(new URL(user.role === "COACH" ? "/coach/dashboard" : "/client/dashboard", request.url));

    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (err) {
    return handleApiError(err);
  }
}
