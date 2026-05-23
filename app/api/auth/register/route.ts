import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { AUTH_COOKIE, signSession } from "@/lib/auth";
import { error, handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { readBody, wantsJson } from "@/lib/request";
import { rateLimit } from "@/lib/security";
import { registerCoachSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const limited = rateLimit(request, 5, 60_000);
    if (limited) return limited;

    const input = registerCoachSchema.parse(await readBody(request));
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) return error("Email already exists", 409);

    const coach =
      input.role === Role.CLIENT
        ? await prisma.user.findFirst({ where: { email: input.coachEmail, role: Role.COACH, isActive: true } })
        : null;

    if (input.role === Role.CLIENT && !coach) {
      return error("Coach email not found. Ask your coach for the email used in SportifSimy.", 404);
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        role: input.role,
        coachId: coach?.id,
        mustChangePassword: false
      }
    });

    const token = await signSession({
      id: user.id,
      email: user.email,
      role: user.role,
      coachId: user.coachId,
      mustChangePassword: user.mustChangePassword
    });

    const response = wantsJson(request)
      ? ok({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } }, { status: 201 })
      : NextResponse.redirect(new URL(user.role === Role.COACH ? "/coach/dashboard" : "/client/dashboard", request.url));

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
