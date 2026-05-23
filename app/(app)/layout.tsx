import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      role: true
    }
  });

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <AppSidebar
        role={user.role}
        accountName={profile ? `${profile.firstName} ${profile.lastName}` : user.email}
        accountEmail={profile?.email ?? user.email}
      />
      <main className="pb-24 md:ml-64 md:pb-0">
        <div>{children}</div>
      </main>
    </div>
  );
}
