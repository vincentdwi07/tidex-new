"use client";

import { useState, useEffect, useCallback } from "react";
import { getNews, createNews, updateNews, deleteNews } from "@/lib/api";
import type { News } from "@/lib/api";
import type { NewsFormValues } from "../schema/news.schema";

export function useNews() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getNews(1, 50);
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

  async function save(values: NewsFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("judul", values.judul);
    fd.append("konten", values.konten);
    fd.append("is_published", String(values.is_published));
    if (values.imageFile) fd.append("image", values.imageFile);

    if (editId) {
      await updateNews(editId, fd);
    } else {
      await createNews(fd);
    }
    await load();
  }

  async function remove(id: number) {
    await deleteNews(id);
    await load();
  }

  return { items, loading, error, save, remove, reload: load };
}
