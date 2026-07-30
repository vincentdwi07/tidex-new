"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/lib/api/visitor";

const STORAGE_KEY = "vt_tracked_date";

export default function VisitorTracker() {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastTracked = localStorage.getItem(STORAGE_KEY);

    // Only track once per day per browser
    if (lastTracked === today) return;

    // Use ipify to get the public IP, then send to backend
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then(({ ip }: { ip: string }) => trackVisitor(ip))
      .then(() => localStorage.setItem(STORAGE_KEY, today))
      .catch(() => {
        // Fallback: track without IP (backend will use RemoteAddr)
        trackVisitor("").then(() => localStorage.setItem(STORAGE_KEY, today));
      });
  }, []);

  return null;
}
