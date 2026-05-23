import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError, ok } from "@/lib/api";
import { requireAuth } from "@/lib/security";
import { nutritionPlanSchema } from "@/lib/validators";
import { createNutritionPlan, getVisibleNutritionPlans } from "@/services/nutrition-service";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof Response) return user;
    return ok(await getVisibleNutritionPlans(user));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = nutritionPlanSchema.parse(await readBody(request));
    const plan = await createNutritionPlan(user.id, input);
    return wantsJson(request) ? created(plan) : redirectBack(request, "/coach/nutrition-plans");
  } catch (err) {
    return handleApiError(err);
  }
}
