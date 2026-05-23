import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createClientForCoach(coachId: string, input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  weightKg?: number;
  heightCm?: number;
  goal?: string;
}) {
  const passwordHash = await bcrypt.hash("ChangeMe@2026", 12);

  return prisma.user.create({
    data: {
      ...input,
      role: Role.CLIENT,
      coachId,
      passwordHash,
      mustChangePassword: true
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      coachId: true,
      createdAt: true
    }
  });
}

export function listCoachClients(coachId: string) {
  return prisma.user.findMany({
    where: { coachId, role: Role.CLIENT },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      goal: true,
      weightKg: true,
      createdAt: true,
      checkIns: { orderBy: { createdAt: "desc" }, take: 1 }
    }
  });
}

export async function updateCoachClient(coachId: string, clientId: string, input: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  weightKg?: number;
  heightCm?: number;
  goal?: string;
  isActive?: boolean;
}) {
  const client = await prisma.user.findFirst({ where: { id: clientId, coachId, role: Role.CLIENT } });
  if (!client) throw new Error("Client not found for this coach.");

  return prisma.user.update({
    where: { id: clientId },
    data: input,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      coachId: true,
      updatedAt: true
    }
  });
}

export async function deleteCoachClient(coachId: string, clientId: string) {
  const client = await prisma.user.findFirst({ where: { id: clientId, coachId, role: Role.CLIENT } });
  if (!client) throw new Error("Client not found for this coach.");
  return prisma.user.delete({ where: { id: clientId } });
}
