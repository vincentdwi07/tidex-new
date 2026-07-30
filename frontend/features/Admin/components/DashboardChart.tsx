// components/dashboard/VisitorChart.tsx
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { VisitorStat } from "@/lib/api";

interface VisitorChartProps {
  data: VisitorStat[];
  loading: boolean;
}

const chartConfig = {
  count: {
    label: "Pengunjung Unik",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function VisitorChart({ data, loading }: VisitorChartProps) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-40 mb-2" />
        <div className="h-8 bg-slate-200 rounded w-24 mb-6" />
        <div className="h-[240px] bg-slate-100 rounded-lg" />
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const avg = data.length ? Math.round(total / data.length) : 0;

  // trend: bandingin 7 hari terakhir vs 7 hari sebelumnya
  const last7 = data.slice(-7).reduce((s, d) => s + d.count, 0);
  const prev7 = data.slice(-14, -7).reduce((s, d) => s + d.count, 0);
  const trendPct = prev7 > 0 ? Math.round(((last7 - prev7) / prev7) * 100) : 0;

  const TrendIcon =
    trendPct > 0 ? TrendingUp : trendPct < 0 ? TrendingDown : Minus;
  const trendColor =
    trendPct > 0
      ? "text-emerald-600"
      : trendPct < 0
        ? "text-red-600"
        : "text-slate-400";

  const chartData = data.map((d) => ({
    date: d.date,
    label: formatDateLabel(d.date),
    count: d.count,
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">
            Pengunjung Unik — 30 Hari Terakhir
          </p>
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              {total.toLocaleString("id-ID")}
            </p>
            <span className="text-sm text-slate-400">rata-rata {avg}/hari</span>
          </div>
        </div>
        {data.length >= 14 && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}
          >
            <TrendIcon className="w-4 h-4" />
            {Math.abs(trendPct)}%
          </div>
        )}
      </div>

      <ChartContainer config={chartConfig} className="h-[240px] w-full">
        <AreaChart
          data={chartData}
          margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-count)"
                stopOpacity={0.25}
              />
              <stop
                offset="95%"
                stopColor="var(--color-count)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={32}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={28}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            allowDecimals={false}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload
                    ? new Date(payload[0].payload.date).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        },
                      )
                    : ""
                }
                formatter={(value) => [`${value} pengunjung`, ""]}
              />
            }
          />
          <Area
            dataKey="count"
            type="monotone"
            fill="url(#fillCount)"
            stroke="var(--color-count)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
