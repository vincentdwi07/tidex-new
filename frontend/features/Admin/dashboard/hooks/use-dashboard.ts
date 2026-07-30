import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getVisitorStats,
  type DashboardStats,
  type VisitorStat,
} from "@/lib/api";

export interface UseDashboardResult {
  stats: DashboardStats | null;
  visitorData: VisitorStat[];
  loading: boolean;
}

export function useDashboard(): UseDashboardResult {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [visitorData, setVisitorData] = useState<VisitorStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 10s timeout fallback so loading never hangs
    const timeout = setTimeout(() => setLoading(false), 10_000);

    Promise.allSettled([getDashboardStats(), getVisitorStats(30)])
      .then(([statsResult, visitorResult]) => {
        if (statsResult.status === "fulfilled") setStats(statsResult.value);
        if (visitorResult.status === "fulfilled") setVisitorData(visitorResult.value ?? []);
      })
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => clearTimeout(timeout);
  }, []);

  return { stats, visitorData, loading };
}
