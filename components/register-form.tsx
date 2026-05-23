"use client";

import { useState } from "react";
import { UserPlus, Users } from "lucide-react";

export function RegisterForm() {
  const [role, setRole] = useState<"COACH" | "CLIENT">("COACH");

  return (
    <form action="/api/auth/register" method="post" className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <input type="hidden" name="role" value={role} />

      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
          {role === "COACH" ? <UserPlus className="h-5 w-5" /> : <Users className="h-5 w-5" />}
        </div>
        <div>
          <h2 className="text-xl font-black">Créer un compte</h2>
          <p className="text-sm text-slate-500">
            {role === "COACH" ? "Pour créer et suivre vos clients." : "Pour rejoindre le suivi de votre coach."}
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-[#f1f4f6] p-2">
        <button
          type="button"
          onClick={() => setRole("COACH")}
          className={`rounded-xl px-4 py-3 text-sm font-black transition ${role === "COACH" ? "bg-white text-[#4e45e4] shadow-[0_4px_18px_rgba(45,51,55,0.08)]" : "text-[#596063]"}`}
        >
          Coach
        </button>
        <button
          type="button"
          onClick={() => setRole("CLIENT")}
          className={`rounded-xl px-4 py-3 text-sm font-black transition ${role === "CLIENT" ? "bg-white text-[#4e45e4] shadow-[0_4px_18px_rgba(45,51,55,0.08)]" : "text-[#596063]"}`}
        >
          Client
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold" htmlFor="firstName">Prenom</label>
          <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="firstName" name="firstName" required />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="lastName">Nom</label>
          <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="lastName" name="lastName" required />
        </div>
      </div>

      <label className="mt-4 block text-sm font-semibold" htmlFor="email">
        {role === "COACH" ? "Email" : "Email client"}
      </label>
      <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="email" name="email" type="email" placeholder={role === "COACH" ? "coach@exemple.com" : "client@exemple.com"} required />

      {role === "CLIENT" ? (
        <>
          <label className="mt-4 block text-sm font-semibold" htmlFor="coachEmail">Email du coach</label>
          <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="coachEmail" name="coachEmail" type="email" placeholder="coach@exemple.com" required />
        </>
      ) : null}

      <label className="mt-4 block text-sm font-semibold" htmlFor="password">Mot de passe</label>
      <input className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 outline-none focus:ring-2 focus:ring-primary" id="password" name="password" type="password" minLength={8} placeholder="8 caracteres minimum" required />

      <button className="mt-6 h-11 w-full rounded-lg bg-primary px-4 font-bold text-white transition hover:opacity-90" type="submit">
        {role === "COACH" ? "Créer mon espace coach" : "Créer mon espace client"}
      </button>
    </form>
  );
}
