import { ProgramStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function ensureClientBelongsToCoach(clientId: string, coachId: string) {
  const client = await prisma.user.findFirst({ where: { id: clientId, coachId } });
  if (!client) throw new Error("Client not found for this coach.");
  return client;
}

export async function createProgram(coachId: string, input: {
  clientId: string;
  title: string;
  description?: string;
  status: ProgramStatus;
  startsAt?: Date;
  endsAt?: Date;
}) {
  await ensureClientBelongsToCoach(input.clientId, coachId);

  if (input.status === ProgramStatus.ACTIVE) {
    await prisma.program.updateMany({
      where: { clientId: input.clientId, status: ProgramStatus.ACTIVE },
      data: { status: ProgramStatus.ARCHIVED }
    });
  }

  return prisma.program.create({
    data: { ...input, coachId },
    include: { sessions: true }
  });
}

export async function getVisiblePrograms(user: { id: string; role: string; coachId: string | null }) {
  return prisma.program.findMany({
    where: user.role === "COACH" ? { coachId: user.id } : { clientId: user.id },
    include: {
      client: { select: { id: true, firstName: true, lastName: true } },
      sessions: { include: { exercises: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } }
    },
    orderBy: { updatedAt: "desc" }
  });
}
