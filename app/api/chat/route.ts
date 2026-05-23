import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { handleApiError, ok } from "@/lib/api";
import { requireAuth } from "@/lib/security";
import { chatMessageSchema } from "@/lib/validators";
import { createChatTurn, getClientChatHistory } from "@/services/chat-service";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;
    return ok(await getClientChatHistory(user.id));
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;
    const input = chatMessageSchema.parse(await request.json());
    return ok(await createChatTurn(user.id, input.message, input.conversationId));
  } catch (err) {
    return handleApiError(err);
  }
}
