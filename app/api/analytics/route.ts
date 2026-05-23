import { NextRequest } from "next/server";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof Response) return user;

    if (user.role === "COACH") {
      const [clients, activePrograms, checkIns] = await Promise.all([
        prisma.user.count({ where: { coachId: user.id } }),
        prisma.program.count({ where: { coachId: user.id, status: "ACTIVE" } }),
        prisma.checkIn.count({ where: { client: { coachId: user.id } } })
      ]);

      return ok({ clients, activePrograms, checkIns });
    }

    const [completedSessions, latestCheckIns, activeProgram, activeNutrition] = await Promise.all([
      prisma.completedSession.count({ where: { clientId: user.id } }),
      prisma.checkIn.findMany({ where: { clientId: user.id }, orderBy: { createdAt: "asc" }, take: 12 }),
      prisma.program.findFirst({ where: { clientId: user.id, status: "ACTIVE" } }),
      prisma.nutritionPlan.findFirst({ where: { clientId: user.id, status: "ACTIVE" } })
    ]);

    return ok({ completedSessions, latestCheckIns, activeProgram, activeNutrition });
  } catch (err) {
    return handleApiError(err);
  }
}
