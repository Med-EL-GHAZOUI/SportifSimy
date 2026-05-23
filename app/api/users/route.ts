import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError, ok } from "@/lib/api";
import { requireAuth } from "@/lib/security";
import { createClientSchema } from "@/lib/validators";
import { createClientForCoach, listCoachClients } from "@/services/client-service";
import { readBody, redirectBack, wantsJson } from "@/lib/request";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    return ok(await listCoachClients(user.id));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const input = createClientSchema.parse(await readBody(request));
    const client = await createClientForCoach(user.id, input);
    return wantsJson(request) ? created(client) : redirectBack(request, "/coach/clients");
  } catch (err) {
    return handleApiError(err);
  }
}
