import Link from "next/link";
import { Activity, Apple, ArrowRight, BarChart3, CheckCircle2, Dumbbell, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "Espace coach", text: "Clients, programmes, nutrition et progression depuis un dashboard clair." },
  { icon: Dumbbell, title: "Espace client", text: "Seances, exercices, historique et check-ins accessibles sur mobile." },
  { icon: ShieldCheck, title: "Securise", text: "JWT, roles, validation Zod, controle d'acces et isolation des donnees." }
];

const modelItems = [
  { icon: Dumbbell, label: "TrainingProgram", detail: "Sessions et exercices" },
  { icon: Apple, label: "NutritionProgram", detail: "Meals et ingredients" },
  { icon: Activity, label: "CheckIn", detail: "Poids, photos, feedback" },
  { icon: BarChart3, label: "Analytics", detail: "Progression client" }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="text-xl font-black tracking-tight text-primary">SportifSimy</Link>
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost"><Link href="/login">Connexion</Link></Button>
            <Button asChild><Link href="/register">Créer un compte</Link></Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-10 md:grid-cols-[1fr_0.9fr] md:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <CheckCircle2 className="h-4 w-4" />
            SaaS fitness premium
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Plateforme moderne pour coachs sportifs et clients suivis.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Gérez les clients, programmes sportifs, nutrition, check-ins, photos et progression dans une interface responsive prête pour PostgreSQL, Prisma et Vercel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 px-6">
              <Link href="/register">Commencer comme coach <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="secondary" className="h-12 px-6">
              <Link href="/login">J'ai déjà un compte</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Architecture</p>
              <h2 className="mt-1 text-2xl font-black">Suivi coach-client</h2>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 text-primary"><ShieldCheck className="h-6 w-6" /></div>
          </div>
          <div className="grid gap-3">
            {modelItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg bg-muted p-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-card text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 md:grid-cols-3 md:px-8">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <feature.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 text-lg font-black">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{feature.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
