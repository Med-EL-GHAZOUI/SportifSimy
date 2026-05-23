import { NutritionPlanStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ensureClientBelongsToCoach } from "@/services/program-service";

export async function createNutritionPlan(coachId: string, input: {
  clientId: string;
  title: string;
  description?: string;
  status: NutritionPlanStatus;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  startsAt?: Date;
  endsAt?: Date;
}) {
  await ensureClientBelongsToCoach(input.clientId, coachId);

  if (input.status === NutritionPlanStatus.ACTIVE) {
    await prisma.nutritionPlan.updateMany({
      where: { clientId: input.clientId, status: NutritionPlanStatus.ACTIVE },
      data: { status: NutritionPlanStatus.ARCHIVED }
    });
  }

  return prisma.nutritionPlan.create({ data: { ...input, coachId }, include: { meals: true } });
}

export function getVisibleNutritionPlans(user: { id: string; role: string }) {
  return prisma.nutritionPlan.findMany({
    where: user.role === "COACH" ? { coachId: user.id } : { clientId: user.id },
    include: { meals: { orderBy: { order: "asc" } }, client: { select: { id: true, firstName: true, lastName: true } } },
    orderBy: { updatedAt: "desc" }
  });
}
