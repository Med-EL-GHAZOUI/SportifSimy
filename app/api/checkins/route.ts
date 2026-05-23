import { NextRequest } from "next/server";
import { Role } from "@prisma/client";
import { created, handleApiError, ok } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/security";
import { uploadCheckInPhoto } from "@/lib/cloudinary";
import { checkInSchema } from "@/lib/validators";
import { redirectBack, wantsJson } from "@/lib/request";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    if (user instanceof Response) return user;

    const checkIns = await prisma.checkIn.findMany({
      where: user.role === "COACH" ? { client: { coachId: user.id } } : { clientId: user.id },
      include: { client: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: "desc" }
    });

    return ok(checkIns);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request, [Role.CLIENT]);
    if (user instanceof Response) return user;

    const formData = await request.formData();
    const rawInput = Object.fromEntries(formData.entries());
    delete rawInput.frontPhoto;
    const input = checkInSchema.parse(rawInput);
    const photo = formData.get("frontPhoto");
    const frontPhotoUrl = photo instanceof File && photo.size > 0 ? await uploadCheckInPhoto(photo, user.id) : undefined;

    const checkIn = await prisma.checkIn.create({
      data: {
        ...input,
        clientId: user.id,
        frontPhotoUrl
      }
    });
    return wantsJson(request) ? created(checkIn) : redirectBack(request, "/client/check-ins");
  } catch (err) {
    return handleApiError(err);
  }
}
