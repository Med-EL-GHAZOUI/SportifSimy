import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function created<T>(data: T) {
  return ok(data, { status: 201 });
}

export function error(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ error: { message, details } }, { status });
}

export function handleApiError(err: unknown) {
  if (err instanceof ZodError) {
    return error("Validation failed", 422, err.flatten());
  }

  if (err instanceof Error) {
    if (err.message.includes("Environment variable not found: DATABASE_URL")) {
      return error("Database is not configured. Please set DATABASE_URL and restart the server.", 500);
    }

    if (err.message.includes("Can't reach database server") || err.message.includes("P1001")) {
      return error("Database is unavailable. Start PostgreSQL, then run Prisma migrations.", 503);
    }

    if (err.message.includes("Authentication failed against database server")) {
      return error("Database credentials are invalid. Update DATABASE_URL in .env or start the Docker PostgreSQL database for this project.", 503);
    }

    return error(err.message, 400);
  }

  return error("Unexpected server error", 500);
}
