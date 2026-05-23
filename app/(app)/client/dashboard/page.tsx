import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ClientDashboardPage() {
  const user = await getCurrentUser();
  const [program, nutrition, checkIns, completed] = await Promise.all([
    prisma.program.findFirst({ where: { clientId: user!.id, status: "ACTIVE" }, include: { sessions: true } }),
    prisma.nutritionPlan.findFirst({ where: { clientId: user!.id, status: "ACTIVE" } }),
    prisma.checkIn.findMany({ where: { clientId: user!.id }, orderBy: { createdAt: "desc" }, take: 2 }),
    prisma.completedSession.count({ where: { clientId: user!.id } })
  ]);
  const recommendations = await prisma.recommendation.findMany({ where: { clientId: user!.id }, orderBy: { createdAt: "desc" }, take: 3 });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Espace client</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Dashboard</h1>
      </header>
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Seances terminees" value={String(completed)} trend="+12%" />
        <MetricCard label="Programme actif" value={program?.title ?? "Aucun"} />
        <MetricCard label="Calories" value={nutrition ? `${nutrition.calories}` : "-"} />
        <MetricCard label="Dernier poids" value={checkIns[0] ? `${Number(checkIns[0].weightKg)} kg` : "-"} />
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Focus semaine</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {(program?.sessions ?? []).map((session) => (
            <div key={session.id} className="rounded-lg bg-muted p-4">
              <p className="font-bold">{session.title}</p>
              <p className="mt-1 text-sm text-slate-500">{session.durationMinutes} min</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recommandations automatiques</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {recommendations.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#f1f4f6] p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#4e45e4]">{item.type}</p>
              <p className="mt-2 font-black text-[#2d3337]">{item.title}</p>
              <p className="mt-1 text-sm text-[#596063]">{item.body}</p>
            </div>
          ))}
          {recommendations.length === 0 ? <p className="text-sm text-[#596063]">Discutez avec le Coach IA pour générer vos premières recommandations.</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
