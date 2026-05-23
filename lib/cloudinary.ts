import { v2 as cloudinary } from "cloudinary";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function uploadCheckInPhoto(file: File, clientId: string) {
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    throw new Error("Only JPG and PNG photos are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Photo size must be 5MB or less.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    const extension = file.type === "image/png" ? "png" : "jpg";
    const fileName = `${crypto.randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "checkins", clientId);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), buffer);
    return `/uploads/checkins/${clientId}/${fileName}`;
  }

  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: `SportifSimy/checkins/${clientId}`,
    resource_type: "image",
    transformation: [{ width: 1400, height: 1800, crop: "limit", quality: "auto", fetch_format: "auto" }]
  });

  return result.secure_url;
}
