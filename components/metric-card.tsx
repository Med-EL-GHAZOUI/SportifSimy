import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(45,51,55,0.08)]">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-[#596063]">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <p className="text-3xl font-black tracking-tight text-[#2d3337]">{value}</p>
          {trend ? <span className="rounded-full bg-[#91feef]/35 px-2 py-1 text-xs font-bold text-[#006259]">{trend}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}
