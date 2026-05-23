import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;
    const notifications = await prisma.notification.findMany({
      where: { clientId: user.id },
      orderBy: { createdAt: "desc" },
      take: 30
    });
    return ok(notifications);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;
    await prisma.notification.updateMany({
      where: { clientId: user.id, readAt: null },
      data: { readAt: new Date() }
    });
    return ok({ read: true });
  } catch (err) {
    return handleApiError(err);
  }
}
