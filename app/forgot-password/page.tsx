export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-soft">
        <h1 className="text-2xl font-black">Mot de passe oublie</h1>
        <p className="mt-2 text-sm text-slate-500">Le flux email sera branche dans le module notification.</p>
        <input className="mt-6 h-11 w-full rounded-lg border border-border bg-background px-3" type="email" placeholder="email@exemple.com" />
        <button className="mt-4 h-11 w-full rounded-lg bg-primary font-bold text-white" type="button">Envoyer le lien</button>
      </form>
    </main>
  );
}
