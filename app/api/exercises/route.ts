import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";
import { exerciseSchema } from "@/lib/validators";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = exerciseSchema.parse(await readBody(request));

    const session = await prisma.session.findFirst({
      where: { id: input.sessionId, program: { coachId: user.id } }
    });
    if (!session) throw new Error("Session not found for this coach.");

    const exercise = await prisma.exercise.create({ data: input });
    return wantsJson(request) ? created(exercise) : redirectBack(request, "/coach/programs");
  } catch (err) {
    return handleApiError(err);
  }
}
