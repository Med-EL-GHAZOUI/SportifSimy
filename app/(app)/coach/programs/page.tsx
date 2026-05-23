import { Clock, Dumbbell, Layers, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoachProgramsPage() {
  const user = await getCurrentUser();
  const [programs, clients] = await Promise.all([
    prisma.program.findMany({ where: { coachId: user!.id }, include: { client: true, sessions: true }, orderBy: { updatedAt: "desc" } }),
    prisma.user.findMany({ where: { coachId: user!.id }, orderBy: { firstName: "asc" } })
  ]);

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_rgba(45,51,55,0.06)]">
          <div className="flex min-h-[300px] flex-col md:flex-row">
            <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12">
              <span className="mb-6 inline-flex w-fit rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">
                Program Builder
              </span>
              <h1 className="text-4xl font-bold tracking-tighter text-[#2d3337] md:text-5xl">Programmes</h1>
              <p className="mt-3 text-xl text-[#596063]">Créez, assignez et suivez les cycles d'entraînement de vos clients.</p>
            </div>
            <div className="relative h-64 w-full md:h-auto md:w-2/5">
              <img alt="Program coaching" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&h=700&fit=crop" />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/20 to-transparent md:block" />
            </div>
          </div>
        </section>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Dumbbell className="h-5 w-5 text-[#4e45e4]" />Nouveau programme</CardTitle></CardHeader>
          <CardContent>
            <form action="/api/programs" method="post" className="grid gap-3 md:grid-cols-3">
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="title" placeholder="Titre" required />
              <select className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="clientId" required>{clients.map((c) => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select>
              <select className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="status"><option value="DRAFT">Brouillon</option><option value="ACTIVE">Actif</option></select>
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="startsAt" type="date" aria-label="Date de début" />
              <input className="rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] px-5 py-4 outline-none focus:border-[#4e45e4]" name="endsAt" type="date" aria-label="Date de fin" />
              <textarea className="min-h-28 rounded-2xl border border-[#acb3b7]/15 bg-[#f1f4f6] p-5 outline-none focus:border-[#4e45e4] md:col-span-3" name="description" placeholder="Description" />
              <button className="rounded-2xl bg-[#4e45e4] py-4 font-extrabold text-white shadow-lg shadow-[#4e45e4]/20 transition hover:bg-[#4135d8] md:col-span-3" type="submit">Créer</button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program, index) => (
            <article key={program.id} className="group flex min-h-[220px] flex-col justify-between rounded-2xl bg-[#f1f4f6] p-6 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_32px_rgba(45,51,55,0.08)]">
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className={`rounded-xl p-3 ${index % 2 === 0 ? "bg-[#bdbaff] text-[#270ac3]" : "bg-[#91feef] text-[#006259]"}`}><Dumbbell className="h-5 w-5" /></div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#4e45e4]">{program.status}</span>
                </div>
                <h2 className="text-xl font-bold text-[#2d3337]">{program.title}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#596063]"><User className="h-4 w-4" />{program.client.firstName} {program.client.lastName}</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/70 p-3"><p className="text-xs font-bold text-[#596063]">Séances</p><p className="font-black text-[#2d3337]">{program.sessions.length}</p></div>
                <div className="rounded-xl bg-white/70 p-3"><p className="flex items-center gap-1 text-xs font-bold text-[#596063]"><Clock className="h-3 w-3" />Updated</p><p className="font-black text-[#2d3337]">{program.updatedAt.toLocaleDateString("fr-FR")}</p></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
