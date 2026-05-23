import { Camera, CheckCircle2, CircleDot, Scale, Sparkles } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ClientCheckInsPage() {
  const user = await getCurrentUser();
  const checkIns = await prisma.checkIn.findMany({ where: { clientId: user!.id }, orderBy: { createdAt: "desc" } });
  const last = checkIns[0];

  return (
    <div className="ss-page relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/3 rounded-full bg-gradient-to-bl from-[#4e45e4]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-1/4 rounded-full bg-gradient-to-tr from-[#91feef]/20 to-transparent blur-3xl" />

      <div className="ss-container max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337]">Check-ins</h1>
          <p className="mt-2 text-lg text-[#596063]">Track your weekly updates and stay on path to your goals.</p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          <section className="ss-card flex flex-col gap-8 p-8 md:col-span-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="mb-4 inline-flex items-center rounded-full bg-[#91feef] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#006259]">
                  Active Cycle
                </span>
                <h2 className="text-2xl font-bold text-[#2d3337]">Weekly Check-in</h2>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#bdbaff]/20 text-[#4e45e4]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#f1f4f6] p-6">
                <p className="mb-1 text-sm font-medium text-[#596063]">Status</p>
                <p className="font-bold text-[#2d3337]">Ready for your check-in</p>
              </div>
              <div className="rounded-2xl bg-[#f1f4f6] p-6">
                <p className="mb-1 text-sm font-medium text-[#596063]">Last check-in</p>
                <p className="font-bold text-[#2d3337]">{last ? `${Number(last.weightKg)} kg` : "No data"}</p>
              </div>
            </div>

            <form action="/api/checkins" method="post" encType="multipart/form-data" className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#2d3337]">Current Weight (kg)</label>
                <div className="relative">
                  <input className="w-full rounded-2xl border border-[#acb3b7]/15 bg-white px-6 py-4 text-lg font-bold outline-none transition-all focus:border-[#4e45e4] focus:ring-2 focus:ring-[#4e45e4]/20" name="weightKg" placeholder="00.0" step="0.1" type="number" required />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-[#596063]">KG</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-white px-5 py-4 outline-none focus:border-[#4e45e4]" name="waistCm" placeholder="Tour de taille cm" />
                <input className="rounded-2xl border border-[#acb3b7]/15 bg-white px-5 py-4 outline-none focus:border-[#4e45e4]" name="sleepHours" placeholder="Sommeil heures" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#2d3337]">Front Physique Photo</label>
                <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#acb3b7]/30 p-8 transition-all hover:border-[#4e45e4] hover:bg-[#4e45e4]/5">
                  <Camera className="mb-2 h-10 w-10 text-[#596063] transition-colors group-hover:text-[#4e45e4]" />
                  <p className="text-sm font-medium text-[#596063] group-hover:text-[#2d3337]">Click to upload or drag & drop</p>
                  <p className="mt-1 text-xs text-[#596063]/60">PNG, JPG up to 5MB</p>
                  <input className="absolute inset-0 cursor-pointer opacity-0" name="frontPhoto" type="file" accept="image/png,image/jpeg" />
                </div>
              </div>

              <textarea className="min-h-28 w-full resize-none rounded-2xl border border-[#acb3b7]/15 bg-white px-6 py-4 outline-none transition-all focus:border-[#4e45e4] focus:ring-2 focus:ring-[#4e45e4]/20" name="notes" placeholder="How was your energy? Any struggles this week?" />

              <button className="w-full rounded-2xl bg-[#4e45e4] py-4 text-lg font-extrabold text-white shadow-lg shadow-[#4e45e4]/20 transition-all hover:bg-[#4135d8] active:scale-[0.99]" type="submit">
                Submit Check-in
              </button>
            </form>
          </section>

          <aside className="space-y-6 md:col-span-4">
            <div className="rounded-3xl bg-[#e3e9ec] p-6">
              <h3 className="mb-4 font-bold text-[#2d3337]">Why it matters</h3>
              <p className="text-sm leading-relaxed text-[#596063]">Consistent check-ins allow your coach to adjust calories and training volume based on your adaptation.</p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3"><CircleDot className="h-3 w-3 text-[#006b62]" /><span className="text-xs font-semibold text-[#2d3337]">Metabolic Tracking</span></div>
                <div className="flex items-center gap-3"><Sparkles className="h-3 w-3 text-[#6e3bd8]" /><span className="text-xs font-semibold text-[#2d3337]">Visual Progress</span></div>
              </div>
            </div>

            <div className="grid gap-3">
              {checkIns.slice(0, 4).map((checkIn) => (
                <div key={checkIn.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(45,51,55,0.04)]">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#bdbaff]/30 text-[#4e45e4]"><Scale className="h-5 w-5" /></div>
                  <div>
                    <p className="font-bold text-[#2d3337]">{Number(checkIn.weightKg)} kg</p>
                    <p className="text-xs text-[#596063]">{checkIn.createdAt.toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
