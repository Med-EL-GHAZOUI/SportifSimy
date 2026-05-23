"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Apple, BarChart3, Bell, Bot, Dumbbell, LayoutDashboard, LogOut, Users } from "lucide-react";
import type { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const clientNav = [
  { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/training", label: "Training", icon: Dumbbell },
  { href: "/client/check-ins", label: "Check-ins", icon: Activity },
  { href: "/client/nutrition", label: "Nutrition", icon: Apple },
  { href: "/client/progress", label: "Progress", icon: BarChart3 },
  { href: "/client/chat", label: "Coach IA", icon: Bot },
  { href: "/client/notifications", label: "Rappels", icon: Bell }
];

const coachNav = [
  { href: "/coach/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/coach/clients", label: "Clients", icon: Users },
  { href: "/coach/programs", label: "Programs", icon: Dumbbell },
  { href: "/coach/nutrition-plans", label: "Nutrition", icon: Apple },
  { href: "/coach/analytics", label: "Analytics", icon: BarChart3 }
];

export function AppSidebar({ role, accountName, accountEmail }: { role: Role; accountName: string; accountEmail: string }) {
  const pathname = usePathname();
  const nav = role === "COACH" ? coachNav : clientNav;
  const initials = accountName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || accountEmail[0]?.toUpperCase() || "?";

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-slate-100 py-8 md:flex">
        <div className="mb-8 px-6">
          <p className="text-xl font-extrabold tracking-tight text-[#4e45e4]">SportifSimy</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[#596063]">Elite Performance</p>
        </div>

        <nav className="flex flex-1 flex-col">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 text-sm transition-all",
                  active
                    ? "border-r-4 border-[#4e45e4] bg-white font-bold text-[#4e45e4]"
                    : "font-medium text-slate-500 hover:bg-slate-50 hover:text-[#4e45e4]"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-6">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f1f4f6] p-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#bdbaff] text-sm font-black text-[#270ac3]">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-sm font-bold text-[#2d3337]">{accountName}</p>
              <p className="truncate text-xs font-medium text-[#596063]">{accountEmail}</p>
            </div>
          </div>
          <form action="/api/auth/logout" method="post">
            <Button variant="secondary" className="w-full rounded-xl bg-white text-[#596063] hover:bg-[#eef2f5]" type="submit">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-slate-50 px-6 py-4 shadow-[0_-8px_24px_rgba(45,51,55,0.08)] md:hidden">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("flex flex-col items-center gap-1", active ? "text-[#4e45e4]" : "text-slate-500")}>
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
