import Link from "next/link";
import { ArrowRight, Mail, Scale, Target, UserPlus, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachClientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await getCurrentUser();
  const { q } = await searchParams;
  const query = q?.trim();
  const clients = await prisma.user.findMany({
    where: {
      coachId: user!.id,
      ...(query
        ? {
            OR: [
              { firstName: { contains: query, mode: "insensitive" } },
              { lastName: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
              { goal: { contains: query, mode: "insensitive" } }
            ]
          }
        : {})
    },
    include: { checkIns: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">Client roster</span>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Clients</h1>
              <p className="mt-3 max-w-2xl text-lg text-[#596063]">Création, suivi, détails et progression de chaque client attaché à votre coaching.</p>
            </div>
            <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-[#bdbaff]/25 text-[#4e45e4]">
              <Users className="h-14 w-14" />
            </div>
          </div>
        </section>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-[#4e45e4]" />Créer un client</CardTitle></CardHeader>
          <CardContent>
            <form action="/api/users" method="post" className="grid gap-3 md:grid-cols-3">
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="firstName" placeholder="Prenom" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="lastName" placeholder="Nom" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="email" type="email" placeholder="Email" required />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="weightKg" placeholder="Poids" />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="heightCm" placeholder="Taille cm" />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="goal" placeholder="Objectif" />
              <button className="rounded-2xl bg-[#4e45e4] py-4 font-extrabold text-white shadow-lg shadow-[#4e45e4]/20 transition hover:bg-[#4135d8] md:col-span-3" type="submit">Ajouter</button>
            </form>
          </CardContent>
        </Card>

        <form className="flex gap-3" action="/coach/clients" method="get">
          <input className="min-h-12 flex-1 rounded-2xl border border-[#acb3b7]/15 bg-white px-5 outline-none focus:border-[#4e45e4]" name="q" defaultValue={query} placeholder="Rechercher un client par nom, email ou objectif..." />
          <button className="rounded-2xl bg-[#2d3337] px-6 font-extrabold text-white" type="submit">Rechercher</button>
        </form>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((client, index) => (
            <Link key={client.id} href={`/coach/clients/${client.id}`} className="group">
              <article className="flex min-h-[230px] flex-col justify-between rounded-2xl bg-[#f1f4f6] p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.08)]">
                <div className="flex items-start justify-between">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl font-black ${index % 2 === 0 ? "bg-[#bdbaff] text-[#270ac3]" : "bg-[#91feef] text-[#006259]"}`}>
                    {client.firstName[0]}{client.lastName[0]}
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#596063] transition group-hover:translate-x-1 group-hover:text-[#4e45e4]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#2d3337]">{client.firstName} {client.lastName}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#596063]"><Mail className="h-4 w-4" />{client.email}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#596063]"><Target className="h-4 w-4" />{client.goal ?? "Objectif à définir"}</p>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-white/70 p-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-[#596063]"><Scale className="h-4 w-4 text-[#4e45e4]" />Dernier poids</span>
                  <span className="font-black text-[#2d3337]">{client.checkIns[0]?.weightKg ? `${Number(client.checkIns[0].weightKg)} kg` : "-"}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
