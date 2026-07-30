"use client";

import { useState, useEffect } from "react";
import { adminToast } from "@/features/Admin/components/AdminToast";
import { getMessages, deleteMessage } from "@/lib/api";
import type { Message } from "@/lib/api";

let cache: Message[] | null = null;

export function useMessages() {
  const [items, setItems] = useState<Message[]>(cache ?? []);
  const [loading, setLoading] = useState(cache === null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cache !== null) {
      setItems(cache);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    getMessages(1, 100)
      .then((res) => {
        if (!cancelled) {
          cache = res.data ?? [];
          setItems(cache);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Gagal memuat data";
          setError(msg);
          setLoading(false);
          adminToast.error("Gagal memuat pesan", msg);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function invalidate() {
    cache = null;
    setLoading(true);
    setError("");
    getMessages(1, 100)
      .then((res) => {
        cache = res.data ?? [];
        setItems(cache);
        setLoading(false);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Gagal memuat data";
        setError(msg);
        setLoading(false);
      });
  }

  async function remove(id: number) {
    try {
      await deleteMessage(id);
      adminToast.success("Pesan dihapus", "Pesan berhasil dihapus.");
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus pesan";
      adminToast.error("Gagal menghapus", msg);
      throw err;
    }
  }

  return { items, loading, error, remove, reload: invalidate };
}
