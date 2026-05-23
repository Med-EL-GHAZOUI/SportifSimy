"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function WeightChart({ data }: { data: Array<{ date: string; weight: number }> }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#dde3e7" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} stroke="#596063" />
          <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#596063" domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid rgba(172,179,183,0.18)", boxShadow: "0 8px 32px rgba(45,51,55,0.08)" }} />
          <Line type="monotone" dataKey="weight" stroke="#4e45e4" strokeWidth={4} dot={{ r: 5, fill: "#91feef", stroke: "#4e45e4", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
