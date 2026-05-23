import type { Role } from "@prisma/client";

export type NavRole = Role | "PUBLIC";

export type MetricCard = {
  label: string;
  value: string;
  trend?: string;
};
