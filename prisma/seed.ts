import { PrismaClient, ProgramStatus, NutritionPlanStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const coachPassword = await bcrypt.hash("Coach@2026", 12);
  const clientPassword = await bcrypt.hash("Client@2026", 12);

  const coach = await prisma.user.upsert({
    where: { email: "coach@ss2026.test" },
    update: {},
    create: {
      email: "coach@ss2026.test",
      passwordHash: coachPassword,
      firstName: "Nadia",
      lastName: "Coach",
      role: Role.COACH,
      mustChangePassword: false
    }
  });

  const client = await prisma.user.upsert({
    where: { email: "client@ss2026.test" },
    update: {},
    create: {
      email: "client@ss2026.test",
      passwordHash: clientPassword,
      firstName: "Amine",
      lastName: "Benali",
      role: Role.CLIENT,
      coachId: coach.id,
      weightKg: 82.5,
      heightCm: 181,
      goal: "Perte de gras et force",
      mustChangePassword: true
    }
  });

  const program = await prisma.program.create({
    data: {
      title: "Hypertrophy Reset",
      description: "Programme premium 4 jours avec progression hebdomadaire.",
      status: ProgramStatus.ACTIVE,
      coachId: coach.id,
      clientId: client.id,
      sessions: {
        create: [
          {
            title: "Push Strength",
            dayOfWeek: 1,
            durationMinutes: 60,
            order: 1,
            exercises: {
              create: [
                { name: "Dumbbell bench press", muscleGroup: "Chest", sets: 4, reps: "8-10", restSeconds: 90, order: 1 },
                { name: "Arnold press", muscleGroup: "Shoulders", sets: 3, reps: "10-12", restSeconds: 75, order: 2 },
                { name: "Cable triceps pressdown", muscleGroup: "Triceps", sets: 3, reps: "12-15", restSeconds: 60, order: 3 }
              ]
            }
          },
          {
            title: "Pull Volume",
            dayOfWeek: 3,
            durationMinutes: 55,
            order: 2,
            exercises: {
              create: [
                { name: "Lat pulldown", muscleGroup: "Back", sets: 4, reps: "10-12", restSeconds: 75, order: 1 },
                { name: "Seated row", muscleGroup: "Back", sets: 4, reps: "8-12", restSeconds: 75, order: 2 },
                { name: "Incline curls", muscleGroup: "Biceps", sets: 3, reps: "12", restSeconds: 60, order: 3 }
              ]
            }
          }
        ]
      }
    }
  });

  await prisma.nutritionPlan.create({
    data: {
      title: "Lean Performance",
      description: "Plan riche en proteines avec deficit leger.",
      status: NutritionPlanStatus.ACTIVE,
      calories: 2350,
      proteinG: 180,
      carbsG: 245,
      fatsG: 70,
      coachId: coach.id,
      clientId: client.id,
      meals: {
        create: [
          { name: "Breakfast", timeLabel: "08:00", calories: 520, proteinG: 42, carbsG: 55, fatsG: 14, order: 1 },
          { name: "Lunch", timeLabel: "13:00", calories: 780, proteinG: 58, carbsG: 82, fatsG: 22, order: 2 },
          { name: "Dinner", timeLabel: "20:00", calories: 690, proteinG: 55, carbsG: 64, fatsG: 21, order: 3 }
        ]
      }
    }
  });

  await prisma.checkIn.createMany({
    data: [
      { clientId: client.id, weightKg: 84.2, waistCm: 91.5, mood: 3, energy: 3, notes: "Debut du programme." },
      { clientId: client.id, weightKg: 82.5, waistCm: 88.9, mood: 4, energy: 4, notes: "Meilleure adherence nutrition." }
    ],
    skipDuplicates: true
  });

  console.log(`Seed ready: coach=${coach.email}, client=${client.email}, program=${program.title}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
