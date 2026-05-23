import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8)
});

export const registerCoachSchema = z.object({
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(120),
  role: z.enum(["COACH", "CLIENT"]).default("COACH"),
  coachEmail: z.string().email().toLowerCase().optional()
}).refine((data) => data.role === "COACH" || Boolean(data.coachEmail), {
  message: "L'email du coach est obligatoire pour créer un compte client.",
  path: ["coachEmail"]
});

const optionalPositiveNumber = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().positive().max(400).optional()
);

const optionalPositiveInt = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().positive().max(260).optional()
);

const optionalCheckInNumber = (max: number) =>
  z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().positive().max(max).optional()
  );

const optionalScaleNumber = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().int().min(1).max(5).optional()
);

const optionalSleepHours = z.preprocess(
  (value) => (value === "" || value === null ? undefined : value),
  z.coerce.number().min(0).max(24).optional()
);

export const createClientSchema = z.object({
  email: z.string().email().toLowerCase(),
  firstName: z.string().min(2).max(60),
  lastName: z.string().min(2).max(60),
  phone: z.string().max(30).optional(),
  weightKg: optionalPositiveNumber,
  heightCm: optionalPositiveInt,
  goal: z.string().max(240).optional()
});

const optionalDateString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? new Date(value) : undefined))
  .refine((value) => !value || !Number.isNaN(value.getTime()), "Date invalide. Utilisez le format YYYY-MM-DD.");

export const updateClientSchema = createClientSchema.partial().extend({
  isActive: z.coerce.boolean().optional()
});

export const programSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(1000).optional(),
  clientId: z.string().min(1),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  startsAt: optionalDateString,
  endsAt: optionalDateString
}).refine((data) => !data.startsAt || !data.endsAt || data.endsAt >= data.startsAt, {
  message: "La date de fin doit être après la date de début.",
  path: ["endsAt"]
});

export const sessionSchema = z.object({
  programId: z.string().min(1),
  title: z.string().min(3).max(120),
  dayOfWeek: z.coerce.number().int().min(0).max(6).optional(),
  durationMinutes: z.coerce.number().int().min(5).max(240),
  notes: z.string().max(1000).optional()
});

export const exerciseSchema = z.object({
  sessionId: z.string().min(1),
  name: z.string().min(2).max(120),
  muscleGroup: z.string().max(80).optional(),
  sets: z.coerce.number().int().min(1).max(20),
  reps: z.string().min(1).max(40),
  restSeconds: z.coerce.number().int().min(0).max(600).optional(),
  instructions: z.string().max(1000).optional()
});

export const completeSessionSchema = z.object({
  sessionId: z.string().min(1),
  notes: z.string().max(1000).optional(),
  effortRpe: z.coerce.number().int().min(1).max(10).optional()
});

export const nutritionPlanSchema = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(1000).optional(),
  clientId: z.string().min(1),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  calories: z.coerce.number().int().min(800).max(8000),
  proteinG: z.coerce.number().int().min(0).max(600),
  carbsG: z.coerce.number().int().min(0).max(1000),
  fatsG: z.coerce.number().int().min(0).max(400),
  startsAt: optionalDateString,
  endsAt: optionalDateString
}).refine((data) => !data.startsAt || !data.endsAt || data.endsAt >= data.startsAt, {
  message: "La date de fin doit être après la date de début.",
  path: ["endsAt"]
});

export const mealSchema = z.object({
  nutritionPlanId: z.string().min(1),
  name: z.string().min(2).max(120),
  timeLabel: z.string().max(20).optional(),
  calories: z.coerce.number().int().min(0).max(5000),
  proteinG: z.coerce.number().int().min(0).max(400),
  carbsG: z.coerce.number().int().min(0).max(700),
  fatsG: z.coerce.number().int().min(0).max(300),
  instructions: z.string().max(1000).optional()
});

export const checkInSchema = z.object({
  weightKg: z.coerce.number().positive().max(400),
  waistCm: optionalCheckInNumber(250),
  mood: optionalScaleNumber,
  energy: optionalScaleNumber,
  sleepHours: optionalSleepHours,
  notes: z.string().max(1000).optional()
});

export const chatMessageSchema = z.object({
  message: z.string().min(2, "Message trop court.").max(1200),
  conversationId: z.string().optional()
});
