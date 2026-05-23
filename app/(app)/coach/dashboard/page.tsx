import Link from "next/link";
import { Activity, ArrowRight, Dumbbell, Users } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachDashboardPage() {
  const user = await getCurrentUser();
  const [clients, programs, checkIns, latestClients] = await Promise.all([
    prisma.user.count({ where: { coachId: user!.id } }),
    prisma.program.count({ where: { coachId: user!.id, status: "ACTIVE" } }),
    prisma.checkIn.count({ where: { client: { coachId: user!.id } } }),
    prisma.user.findMany({
      where: { coachId: user!.id },
      include: { checkIns: { orderBy: { createdAt: "desc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card overflow-hidden">
          <div className="grid md:grid-cols-[1fr_360px]">
            <div className="p-8 md:p-12">
              <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">
                Coach Command Center
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Dashboard coach</h1>
              <p className="mt-3 max-w-2xl text-lg text-[#596063]">
                Pilotez vos clients, programmes, check-ins et plans nutritionnels depuis un espace clair et orienté performance.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Users className="mb-4 h-5 w-5 text-[#4e45e4]" /><p className="text-sm text-[#596063]">Clients actifs</p><p className="text-3xl font-black text-[#2d3337]">{clients}</p></div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Dumbbell className="mb-4 h-5 w-5 text-[#006b62]" /><p className="text-sm text-[#596063]">Programmes actifs</p><p className="text-3xl font-black text-[#2d3337]">{programs}</p></div>
                <div className="rounded-2xl bg-[#f1f4f6] p-5"><Activity className="mb-4 h-5 w-5 text-[#6e3bd8]" /><p className="text-sm text-[#596063]">Check-ins reçus</p><p className="text-3xl font-black text-[#2d3337]">{checkIns}</p></div>
              </div>
            </div>
            <div className="relative min-h-[280px] bg-[#dde3e7]">
              <img alt="Coach dashboard" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=900&fit=crop" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/10 to-transparent md:bg-gradient-to-l" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Clients actifs" value={String(clients)} trend="+ focus" />
          <MetricCard label="Programmes actifs" value={String(programs)} />
          <MetricCard label="Check-ins reçus" value={String(checkIns)} trend="live" />
        </section>

        <Card>
          <CardHeader><CardTitle>Clients récents</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            {latestClients.map((client) => (
              <Link key={client.id} href={`/coach/clients/${client.id}`} className="group flex items-center justify-between rounded-2xl bg-[#f1f4f6] p-4 transition hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#bdbaff] font-black text-[#270ac3]">{client.firstName[0]}{client.lastName[0]}</div>
                  <div>
                    <p className="font-bold text-[#2d3337]">{client.firstName} {client.lastName}</p>
                    <p className="text-sm text-[#596063]">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#4e45e4]">
                  {client.checkIns[0] ? `${Number(client.checkIns[0].weightKg)} kg` : "Nouveau"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
