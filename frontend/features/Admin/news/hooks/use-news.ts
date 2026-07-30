"use client";

import { useState, useEffect } from "react";
import { adminToast } from "@/features/Admin/components/AdminToast";
import { getNews, createNews, updateNews, deleteNews } from "@/lib/api";
import type { News } from "@/lib/api";
import type { NewsFormValues } from "../schema/news.schema";

let cache: News[] | null = null;

export function useNews() {
  const [items, setItems] = useState<News[]>(cache ?? []);
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
    getNews(1, 100)
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
          adminToast.error("Gagal memuat berita", msg);
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
    getNews(1, 100)
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

  async function save(values: NewsFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("judul", values.judul);
    fd.append("kategori", values.kategori);
    fd.append("news", values.news);
    if (values.imageFile) fd.append("image", values.imageFile);

    try {
      if (editId) {
        await updateNews(editId, fd);
        adminToast.success("Berita diperbarui", `"${values.judul}" berhasil disimpan.`);
      } else {
        await createNews(fd);
        adminToast.success("Berita ditambahkan", `"${values.judul}" berhasil ditambahkan.`);
      }
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan berita";
      adminToast.error("Gagal menyimpan", msg);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deleteNews(id);
      adminToast.success("Berita dihapus", "Data berita berhasil dihapus.");
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus berita";
      adminToast.error("Gagal menghapus", msg);
      throw err;
    }
  }

  return { items, loading, error, save, remove, reload: invalidate };
}
