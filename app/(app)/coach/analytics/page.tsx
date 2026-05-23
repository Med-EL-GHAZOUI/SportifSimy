import { Activity, BarChart3, Scale, Sparkles, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachAnalyticsPage() {
  const user = await getCurrentUser();
  const checkIns = await prisma.checkIn.findMany({
    where: { client: { coachId: user!.id } },
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });
  const avgWeight = checkIns.length ? checkIns.reduce((sum, c) => sum + Number(c.weightKg), 0) / checkIns.length : 0;
  const lastSeven = checkIns.slice(0, 7);

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">Performance Analytics</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Analytics</h1>
              <p className="mt-3 max-w-2xl text-lg text-[#596063]">Vue globale des check-ins clients, tendances de poids et signaux d'adhérence.</p>
            </div>
            <div className="grid h-32 w-32 place-items-center rounded-[2rem] bg-[#bdbaff]/25 text-[#4e45e4]">
              <BarChart3 className="h-16 w-16" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Check-ins analysés" value={String(checkIns.length)} />
          <MetricCard label="Poids moyen" value={avgWeight ? `${avgWeight.toFixed(1)} kg` : "-"} />
          <MetricCard label="Adhérence" value="86%" trend="+4%" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader><CardTitle>Derniers check-ins</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {checkIns.map((item) => (
                <div key={item.id} className="group flex items-center justify-between rounded-2xl bg-[#f1f4f6] p-4 transition hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#91feef]/40 text-[#006259]"><Scale className="h-5 w-5" /></div>
                    <div>
                      <p className="font-bold text-[#2d3337]">{item.client.firstName} {item.client.lastName}</p>
                      <p className="text-xs text-[#596063]">{item.createdAt.toLocaleDateString("fr-FR")}</p>
                    </div>
                  </div>
                  <span className="font-black text-[#4e45e4]">{Number(item.weightKg)} kg</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-[#e3e9ec] p-6">
              <h3 className="mb-4 font-bold text-[#2d3337]">Coach insights</h3>
              <p className="text-sm leading-relaxed text-[#596063]">Les check-ins réguliers révèlent rapidement les besoins d'ajustement nutritionnel et d'entraînement.</p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3"><Activity className="h-4 w-4 text-[#006b62]" /><span className="text-xs font-semibold text-[#2d3337]">Suivi métabolique</span></div>
                <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-[#6e3bd8]" /><span className="text-xs font-semibold text-[#2d3337]">Feedback visuel</span></div>
                <div className="flex items-center gap-3"><TrendingUp className="h-4 w-4 text-[#4e45e4]" /><span className="text-xs font-semibold text-[#2d3337]">Tendance hebdo</span></div>
              </div>
            </div>

            <Card>
              <CardHeader><CardTitle>7 derniers</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {lastSeven.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="w-6 text-xs font-bold text-[#596063]">#{index + 1}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#dde3e7]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#4e45e4] to-[#91feef]" style={{ width: `${Math.min(100, Number(item.weightKg))}%` }} />
                    </div>
                    <span className="w-14 text-right text-xs font-bold text-[#2d3337]">{Number(item.weightKg)}kg</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </div>
  );
}
