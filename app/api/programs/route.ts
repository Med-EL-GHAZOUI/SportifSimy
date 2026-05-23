import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError, ok } from "@/lib/api";
import { requireAuth } from "@/lib/security";
import { programSchema } from "@/lib/validators";
import { createProgram, getVisiblePrograms } from "@/services/program-service";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof Response) return user;
    return ok(await getVisiblePrograms(user));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = programSchema.parse(await readBody(request));
    const program = await createProgram(user.id, input);
    return wantsJson(request) ? created(program) : redirectBack(request, "/coach/programs");
  } catch (err) {
    return handleApiError(err);
  }
}
