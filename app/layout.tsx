import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SportifSimy",
  description: "Plateforme SaaS de suivi sportif coach-client"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
