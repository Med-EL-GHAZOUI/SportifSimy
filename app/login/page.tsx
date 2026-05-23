import Link from "next/link";
import { ArrowLeft, Dumbbell, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="hidden overflow-hidden rounded-xl border border-border bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&h=1800&fit=crop')] bg-cover bg-center shadow-soft lg:block">
          <div className="flex min-h-[720px] flex-col justify-between bg-gradient-to-b from-black/20 via-black/20 to-black/75 p-8 text-white">
            <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-bold backdrop-blur">
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Link>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">SportifSimy</p>
              <h1 className="mt-3 max-w-md text-5xl font-black tracking-tight">Connexion sécurisée coach et client.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                Accédez à votre dashboard, vos programmes, vos plans nutritionnels et vos check-ins.
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
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Secure fitness SaaS</p>
              </div>
            </Link>
          </div>

          <form action="/api/auth/login" method="post" className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black">Connexion</h2>
                <p className="text-sm text-slate-500">Coach ou client existant.</p>
              </div>
            </div>

            <label className="block text-sm font-semibold" htmlFor="login-email">Email</label>
            <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="login-email" name="email" type="email" placeholder="email@exemple.com" required />

            <label className="mt-4 block text-sm font-semibold" htmlFor="login-password">Mot de passe</label>
            <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="login-password" name="password" type="password" placeholder="********" required />

            <div className="mt-4 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-500">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
                Se souvenir
              </label>
              <Link className="font-bold text-primary" href="/forgot-password">Mot de passe oublie</Link>
            </div>

            <button className="mt-6 h-11 w-full rounded-lg bg-primary px-4 font-bold text-white transition hover:opacity-90" type="submit">
              Se connecter
            </button>

           
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Nouveau coach ? <Link href="/register" className="font-bold text-primary">Créer un compte</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
