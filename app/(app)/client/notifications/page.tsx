import { Bell, CalendarClock, CheckCircle2 } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ClientNotificationsPage() {
  const user = await getCurrentUser();
  const notifications = await prisma.notification.findMany({
    where: { clientId: user!.id },
    orderBy: { createdAt: "desc" },
    take: 30
  });
  const unread = notifications.filter((item) => !item.readAt).length;

  return (
    <div className="ss-page">
      <div className="ss-container space-y-10">
        <section className="ss-card p-8 md:p-12">
          <span className="mb-5 inline-flex rounded-full bg-[#91feef] px-4 py-1.5 text-xs font-semibold text-[#006259]">Rappels automatiques</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#2d3337] md:text-5xl">Notifications</h1>
          <p className="mt-3 max-w-2xl text-lg text-[#596063]">Mises à jour importantes, recommandations chatbot et rappels de check-in.</p>
          <div className="mt-8 rounded-2xl bg-[#f1f4f6] p-5">
            <p className="text-sm font-medium text-[#596063]">Non lues</p>
            <p className="mt-1 text-3xl font-black text-[#2d3337]">{unread}</p>
          </div>
        </section>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <article key={notification.id} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(45,51,55,0.04)]">
              <div className={`grid h-11 w-11 place-items-center rounded-xl ${notification.readAt ? "bg-[#dde3e7] text-[#596063]" : "bg-[#bdbaff]/40 text-[#4e45e4]"}`}>
                {notification.readAt ? <CheckCircle2 className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <h2 className="font-black text-[#2d3337]">{notification.title}</h2>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#596063]">
                    <CalendarClock className="h-3 w-3" />
                    {notification.createdAt.toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#596063]">{notification.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
