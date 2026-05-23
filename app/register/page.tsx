import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="hidden overflow-hidden rounded-xl border border-border bg-[url('https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1400&h=1800&fit=crop')] bg-cover bg-center shadow-soft lg:block">
          <div className="flex min-h-[720px] flex-col justify-between bg-gradient-to-b from-black/20 via-black/20 to-black/75 p-8 text-white">
            <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-bold backdrop-blur">
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Link>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">SportifSimy</p>
              <h1 className="mt-3 max-w-md text-5xl font-black tracking-tight">Créer votre espace sportif.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                Sélectionnez Coach ou Client, puis complétez le même formulaire d’inscription.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md py-4">
          <div className="mb-7 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black tracking-tight">SportifSimy</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Coach & client onboarding</p>
              </div>
            </Link>
          </div>

          <RegisterForm />

          <p className="mt-5 text-center text-sm text-slate-500">
            Déjà inscrit ? <Link href="/login" className="font-bold text-primary">Se connecter</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
