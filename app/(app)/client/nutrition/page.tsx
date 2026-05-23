import { ArrowRight, Flame } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const mealImages = [
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1622484211850-5f2c4fb8a034?w=500&h=500&fit=crop"
];

export default async function ClientNutritionPage() {
  const user = await getCurrentUser();
  const plan = await prisma.nutritionPlan.findFirst({
    where: { clientId: user!.id, status: "ACTIVE" },
    include: { meals: { orderBy: { order: "asc" } } }
  });

  if (!plan) {
    return (
      <div className="ss-page">
        <div className="ss-container ss-card p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2d3337]">Nutrition</h1>
          <p className="mt-2 text-[#596063]">Aucun plan actif pour le moment.</p>
        </div>
      </div>
    );
  }

  const macroRows = [
    { label: "Carbohydrates", hint: "Fueling Performance", value: plan.carbsG, target: Math.max(plan.carbsG + 80, 1), color: "from-[#6e3bd8] to-[#c4acff]", text: "text-[#6e3bd8]" },
    { label: "Protein", hint: "Muscle Recovery", value: plan.proteinG, target: Math.max(plan.proteinG + 30, 1), color: "from-[#4e45e4] to-[#bdbaff]", text: "text-[#4e45e4]" },
    { label: "Fats", hint: "Hormonal Balance", value: plan.fatsG, target: Math.max(plan.fatsG + 20, 1), color: "from-[#006b62] to-[#91feef]", text: "text-[#006b62]" }
  ];

  return (
    <div className="ss-page space-y-10">
      <section className="ss-container">
        <div className="ss-card flex flex-col items-center gap-12 p-8 md:flex-row md:p-12">
          <div className="relative flex h-64 w-64 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90">
              <circle className="text-[#dde3e7]" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12" />
              <circle cx="128" cy="128" fill="transparent" r="110" stroke="url(#nutrition_gradient)" strokeDasharray="691" strokeDashoffset="150" strokeLinecap="round" strokeWidth="12" />
              <defs>
                <linearGradient id="nutrition_gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#4e45e4" />
                  <stop offset="100%" stopColor="#4135d8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-extrabold tracking-tighter text-[#2d3337]">{plan.calories}</span>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#596063]">Kcal plan</span>
              <span className="mt-1 text-xs font-medium text-[#006b62]">Active nutrition</span>
            </div>
          </div>

          <div className="w-full flex-1 space-y-8">
            <div>
              <p className="ss-label">Nutrition</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2d3337]">{plan.title}</h1>
              <p className="mt-2 text-[#596063]">{plan.description ?? "Plan nutritionnel personnalisé pour votre cycle actuel."}</p>
            </div>

            {macroRows.map((macro) => {
              const width = Math.min(100, Math.round((macro.value / macro.target) * 100));
              return (
                <div key={macro.label}>
                  <div className="mb-3 flex items-end justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-[#2d3337]">{macro.label}</h4>
                      <p className="text-sm font-medium text-[#596063]">{macro.hint}</p>
                    </div>
                    <span className={`text-xl font-bold ${macro.text}`}>{macro.value}g <span className="text-sm font-normal text-[#596063]">/ {macro.target}g</span></span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#dde3e7]">
                    <div className={`h-full rounded-full bg-gradient-to-r ${macro.color}`} style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ss-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#2d3337]">Today's Meals</h2>
          <div className="h-[2px] flex-grow rounded-full bg-[#dde3e7] ml-6" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {plan.meals.map((meal, index) => (
            <article key={meal.id} className="group flex cursor-pointer gap-6 rounded-[1.5rem] bg-white p-4 transition-all duration-300 hover:bg-[#f1f4f6]">
              <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl">
                <img alt={meal.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={mealImages[index % mealImages.length]} />
              </div>
              <div className="flex flex-1 flex-col justify-center pr-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-full bg-[#91feef]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#005e56]">{meal.timeLabel ?? "Meal"}</span>
                    <h3 className="mt-1 text-xl font-bold text-[#2d3337]">{meal.name}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#acb3b7] transition-colors group-hover:text-[#4e45e4]" />
                </div>
                <p className="mt-2 line-clamp-1 text-sm italic text-[#596063]">{meal.instructions ?? "Balanced meal aligned with your plan."}</p>
                <p className="mt-auto flex items-center gap-2 text-lg font-bold text-[#2d3337]">
                  <Flame className="h-4 w-4 text-[#4e45e4]" />
                  {meal.calories} <span className="text-xs font-normal text-[#596063]">kcal</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
