import { BarChart3, Camera, Scale, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightChart } from "@/components/weight-chart";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ClientProgressPage() {
  const user = await getCurrentUser();
  const checkIns = await prisma.checkIn.findMany({ where: { clientId: user!.id }, orderBy: { createdAt: "asc" } });
  const first = checkIns[0];
  const last = checkIns.at(-1);
  const delta = first && last ? Number(last.weightKg) - Number(first.weightKg) : 0;
  const chartData = checkIns.map((item) => ({
    date: item.createdAt.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
    weight: Number(item.weightKg)
  }));

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card overflow-hidden">
          <div className="grid gap-0 md:grid-cols-[1fr_360px]">
            <div className="p-8 md:p-12">
              <span className="mb-5 inline-flex items-center rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">
                Visual Progress
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Progress Tracking</h1>
              <p className="mt-3 max-w-2xl text-lg text-[#596063]">
                Suivez votre poids, vos photos et votre évolution globale avec les données envoyées à votre coach.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[#f1f4f6] p-5">
                  <Scale className="mb-4 h-5 w-5 text-[#4e45e4]" />
                  <p className="text-sm font-medium text-[#596063]">Dernier poids</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#2d3337]">{last ? `${Number(last.weightKg)} kg` : "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5">
                  <TrendingDown className="mb-4 h-5 w-5 text-[#006b62]" />
                  <p className="text-sm font-medium text-[#596063]">Variation</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#2d3337]">{checkIns.length > 1 ? `${delta.toFixed(1)} kg` : "-"}</p>
                </div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5">
                  <BarChart3 className="mb-4 h-5 w-5 text-[#6e3bd8]" />
                  <p className="text-sm font-medium text-[#596063]">Check-ins</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#2d3337]">{checkIns.length}</p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[280px] bg-[#dde3e7]">
              <img alt="Progress hero" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=900&fit=crop" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/10 to-transparent md:bg-gradient-to-l" />
            </div>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Evolution poids</CardTitle>
          </CardHeader>
          <CardContent>
            <WeightChart data={chartData} />
          </CardContent>
        </Card>

        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5 text-[#4e45e4]" />Premiere photo</CardTitle>
            </CardHeader>
            <CardContent>
              {first?.frontPhotoUrl ? (
                <img className="aspect-[4/5] w-full rounded-2xl object-cover" src={first.frontPhotoUrl} alt="Premiere photo" />
              ) : (
                <div className="grid aspect-[4/5] place-items-center rounded-2xl bg-[#f1f4f6] text-sm font-semibold text-[#596063]">Aucune photo</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Camera className="h-5 w-5 text-[#006b62]" />Derniere photo</CardTitle>
            </CardHeader>
            <CardContent>
              {last?.frontPhotoUrl ? (
                <img className="aspect-[4/5] w-full rounded-2xl object-cover" src={last.frontPhotoUrl} alt="Derniere photo" />
              ) : (
                <div className="grid aspect-[4/5] place-items-center rounded-2xl bg-[#f1f4f6] text-sm font-semibold text-[#596063]">Aucune photo</div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
