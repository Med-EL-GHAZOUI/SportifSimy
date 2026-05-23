import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";
import { completeSessionSchema, sessionSchema } from "@/lib/validators";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = sessionSchema.parse(await readBody(request));

    const program = await prisma.program.findFirst({ where: { id: input.programId, coachId: user.id } });
    if (!program) throw new Error("Program not found for this coach.");

    const session = await prisma.session.create({ data: input });
    return wantsJson(request) ? created(session) : redirectBack(request, "/coach/programs");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;
    const input = completeSessionSchema.parse(await readBody(request));

    const session = await prisma.session.findFirst({
      where: { id: input.sessionId, program: { clientId: user.id } }
    });
    if (!session) throw new Error("Session not found for this client.");

    const completed = await prisma.completedSession.create({
      data: {
        clientId: user.id,
        sessionId: input.sessionId,
        notes: input.notes,
        effortRpe: input.effortRpe
      }
    });
    return wantsJson(request) ? ok(completed) : redirectBack(request, "/client/training");
  } catch (err) {
    return handleApiError(err);
  }
}
