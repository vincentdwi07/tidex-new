import { apiFetch } from "./client";

export interface VisitorStat {
  date: string;
  count: number;
}

export interface DashboardStats {
  products: number;
  partners: number;
  projects: number;
  news: number;
  unread_messages: number;
}

export async function trackVisitor(ip: string): Promise<void> {
  await apiFetch("/visitors/track", {
    method: "POST",
    body: JSON.stringify({ ip }),
  });
}

export async function getVisitorStats(days = 30): Promise<VisitorStat[]> {
  const data = await apiFetch<VisitorStat[] | null>(`/visitors/stats?days=${days}`, {
    auth: true,
  });
  return data ?? [];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiFetch<DashboardStats>("/stats", { auth: true });
}
