import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { error, handleApiError, ok } from "@/lib/api";
import { readBody, redirectBack, wantsJson } from "@/lib/request";
import { requireAuth } from "@/lib/security";
import { updateClientSchema } from "@/lib/validators";
import { deleteCoachClient, updateCoachClient } from "@/services/client-service";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const { id } = await params;
    const input = updateClientSchema.parse(await readBody(request));
    const client = await updateCoachClient(user.id, id, input);
    return wantsJson(request) ? ok(client) : redirectBack(request, `/coach/clients/${id}`);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    const { id } = await params;
    await deleteCoachClient(user.id, id);
    return wantsJson(request) ? ok({ deleted: true }) : redirectBack(request, "/coach/clients");
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const body = await readBody(request);
  const method = String((body as { _method?: string })._method ?? "").toUpperCase();

  if (method === "DELETE") {
    return DELETE(request, context);
  }

  if (method === "PATCH") {
    const user = await requireAuth(request, [Role.COACH]);
    if (user instanceof Response) return user;
    try {
      const { id } = await context.params;
      const { _method, ...rest } = body as Record<string, unknown>;
      const input = updateClientSchema.parse(rest);
      await updateCoachClient(user.id, id, input);
      return redirectBack(request, `/coach/clients/${id}`);
    } catch (err) {
      return handleApiError(err);
    }
  }

  return error("Unsupported form method.", 405);
}
