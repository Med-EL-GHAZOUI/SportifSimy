import { Apple, Flame, Utensils, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachNutritionPlansPage() {
  const user = await getCurrentUser();
  const [plans, clients] = await Promise.all([
    prisma.nutritionPlan.findMany({ where: { coachId: user!.id }, include: { client: true, meals: true }, orderBy: { updatedAt: "desc" } }),
    prisma.user.findMany({ where: { coachId: user!.id }, orderBy: { firstName: "asc" } })
  ]);

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card flex flex-col items-center gap-10 p-8 md:flex-row md:p-12">
          <div className="relative grid h-56 w-56 shrink-0 place-items-center rounded-full bg-[#f1f4f6]">
            <div className="absolute inset-4 rounded-full border-[12px] border-[#dde3e7]" />
            <div className="absolute inset-4 rounded-full border-[12px] border-[#4e45e4] border-b-[#91feef] border-l-[#c4acff]" />
            <Apple className="relative h-20 w-20 text-[#4e45e4]" />
          </div>
          <div className="flex-1">
            <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">Nutrition Builder</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Plans nutritionnels</h1>
            <p className="mt-3 max-w-2xl text-lg text-[#596063]">Créez des plans macro précis, assignez-les et gardez un seul plan actif par client.</p>
          </div>
        </section>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Utensils className="h-5 w-5 text-[#4e45e4]" />Nouveau plan</CardTitle></CardHeader>
          <CardContent>
            <form action="/api/nutrition" method="post" className="grid gap-3 md:grid-cols-4">
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="title" placeholder="Titre" required />
              <select className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="clientId" required>{clients.map((c) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select>
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="calories" placeholder="Calories" required />
              <select className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="status"><option value="DRAFT">Brouillon</option><option value="ACTIVE">Actif</option></select>
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="proteinG" placeholder="Proteines" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="carbsG" placeholder="Glucides" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="fatsG" placeholder="Lipides" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="startsAt" type="date" aria-label="Date de début" />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="endsAt" type="date" aria-label="Date de fin" />
              <button className="rounded-2xl bg-[#4e45e4] py-4 font-extrabold text-white shadow-lg shadow-[#4e45e4]/20 transition hover:bg-[#4135d8]" type="submit">Créer</button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.id} className="rounded-[1.5rem] bg-white p-6 shadow-[0_8px_32px_rgba(45,51,55,0.06)] transition hover:bg-[#f1f4f6]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="rounded-full bg-[#91feef]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#005e56]">{plan.status}</span>
                  <h2 className="mt-2 text-xl font-bold text-[#2d3337]">{plan.title}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#596063]"><User className="h-4 w-4" />{plan.client.firstName} {plan.client.lastName}</p>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#bdbaff]/30 text-[#4e45e4]"><Apple className="h-7 w-7" /></div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                <div className="rounded-xl bg-white/80 p-3"><p className="text-xs font-bold text-[#596063]">Kcal</p><p className="font-black text-[#2d3337]">{plan.calories}</p></div>
                <div className="rounded-xl bg-white/80 p-3"><p className="text-xs font-bold text-[#596063]">P</p><p className="font-black text-[#4e45e4]">{plan.proteinG}g</p></div>
                <div className="rounded-xl bg-white/80 p-3"><p className="text-xs font-bold text-[#596063]">C</p><p className="font-black text-[#6e3bd8]">{plan.carbsG}g</p></div>
                <div className="rounded-xl bg-white/80 p-3"><p className="text-xs font-bold text-[#596063]">F</p><p className="font-black text-[#006b62]">{plan.fatsG}g</p></div>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#596063]"><Flame className="h-4 w-4 text-[#4e45e4]" />{plan.meals.length} repas configurés</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
