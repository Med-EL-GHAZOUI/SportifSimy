import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";
import { mealSchema } from "@/lib/validators";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = mealSchema.parse(await readBody(request));

    const plan = await prisma.nutritionPlan.findFirst({
      where: { id: input.nutritionPlanId, coachId: user.id }
    });
    if (!plan) throw new Error("Nutrition plan not found for this coach.");

    const meal = await prisma.meal.create({ data: input });
    return wantsJson(request) ? created(meal) : redirectBack(request, "/coach/nutrition-plans");
  } catch (err) {
    return handleApiError(err);
  }
}
