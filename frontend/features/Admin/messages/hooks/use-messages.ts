"use client";

import { useState, useEffect, useCallback } from "react";
import { getMessages, deleteMessage } from "@/lib/api";
import type { Message } from "@/lib/api";

export function useMessages() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getMessages(1, 50);
      setItems(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: number) {
    await deleteMessage(id);
    await load();
  }

  return { items, loading, error, remove, reload: load };
}
