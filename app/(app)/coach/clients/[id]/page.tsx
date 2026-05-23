import { notFound } from "next/navigation";
import { Activity, Dumbbell, Mail, Scale, Target, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const client = await prisma.user.findFirst({
    where: { id, coachId: user!.id },
    include: {
      programsAssigned: { orderBy: { updatedAt: "desc" }, take: 5 },
      nutritionAssigned: { orderBy: { updatedAt: "desc" }, take: 5 },
      checkIns: { orderBy: { createdAt: "desc" }, take: 8 },
      completedSessions: { orderBy: { completedAt: "desc" }, take: 8, include: { session: true } }
    }
  });

  if (!client) notFound();

  const latestWeight = client.checkIns[0]?.weightKg ? Number(client.checkIns[0].weightKg) : null;

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card overflow-hidden">
          <div className="grid md:grid-cols-[1fr_320px]">
            <div className="p-8 md:p-12">
              <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">Client profile</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">{client.firstName} {client.lastName}</h1>
              <p className="mt-3 flex items-center gap-2 text-[#596063]"><Mail className="h-4 w-4" />{client.email}</p>
              <p className="mt-2 flex items-center gap-2 text-[#596063]"><Target className="h-4 w-4" />{client.goal ?? "Objectif non défini"}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Scale className="mb-4 h-5 w-5 text-[#4e45e4]" /><p className="text-sm text-[#596063]">Dernier poids</p><p className="text-2xl font-black text-[#2d3337]">{latestWeight ? `${latestWeight} kg` : "-"}</p></div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Activity className="mb-4 h-5 w-5 text-[#006b62]" /><p className="text-sm text-[#596063]">Check-ins</p><p className="text-2xl font-black text-[#2d3337]">{client.checkIns.length}</p></div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Dumbbell className="mb-4 h-5 w-5 text-[#6e3bd8]" /><p className="text-sm text-[#596063]">Séances</p><p className="text-2xl font-black text-[#2d3337]">{client.completedSessions.length}</p></div>
              </div>
            </div>
            <div className="relative min-h-[260px] bg-[#dde3e7]">
              <img alt="Client coaching" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=900&fit=crop" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50" />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Modifier le client</CardTitle></CardHeader>
            <CardContent>
              <form action={`/api/users/${client.id}`} method="post" className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="_method" value="PATCH" />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="firstName" defaultValue={client.firstName} required />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="lastName" defaultValue={client.lastName} required />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4] md:col-span-2" name="email" type="email" defaultValue={client.email} required />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="weightKg" defaultValue={client.weightKg ? String(client.weightKg) : ""} placeholder="Poids" />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="heightCm" defaultValue={client.heightCm ?? ""} placeholder="Taille cm" />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4] md:col-span-2" name="goal" defaultValue={client.goal ?? ""} placeholder="Objectif" />
                <button className="rounded-2xl bg-[#4e45e4] py-4 font-extrabold text-white md:col-span-2" type="submit">Enregistrer</button>
              </form>
              <form action={`/api/users/${client.id}`} method="post" className="mt-3">
                <input type="hidden" name="_method" value="DELETE" />
                <button className="w-full rounded-2xl bg-[#ac3149] py-4 font-extrabold text-white" type="submit">Supprimer ce client</button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-[#4e45e4]" />Check-ins</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {client.checkIns.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#f1f4f6] p-4">
                  <div><p className="font-bold text-[#2d3337]">{Number(item.weightKg)} kg</p><p className="text-sm text-[#596063]">{item.createdAt.toLocaleDateString("fr-FR")}</p></div>
                  <Scale className="h-5 w-5 text-[#4e45e4]" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Dumbbell className="h-5 w-5 text-[#006b62]" />Historique entraînements</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {client.completedSessions.map((item) => (
                <div key={item.id} className="rounded-2xl bg-[#f1f4f6] p-4">
                  <p className="font-bold text-[#2d3337]">{item.session.title}</p>
                  <p className="text-sm text-[#596063]">{item.completedAt.toLocaleDateString("fr-FR")}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Dumbbell className="h-5 w-5 text-[#6e3bd8]" />Programmes</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {client.programsAssigned.map((program) => <div key={program.id} className="rounded-2xl bg-[#f1f4f6] p-4"><p className="font-bold text-[#2d3337]">{program.title}</p><p className="text-sm text-[#596063]">{program.status}</p></div>)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Utensils className="h-5 w-5 text-[#006b62]" />Nutrition</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {client.nutritionAssigned.map((plan) => <div key={plan.id} className="rounded-2xl bg-[#f1f4f6] p-4"><p className="font-bold text-[#2d3337]">{plan.title}</p><p className="text-sm text-[#596063]">{plan.calories} kcal | {plan.status}</p></div>)}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
