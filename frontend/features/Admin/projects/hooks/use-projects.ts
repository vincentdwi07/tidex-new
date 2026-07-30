"use client";

import { useState, useEffect } from "react";
import { adminToast } from "@/features/Admin/components/AdminToast";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";
import type { Project } from "@/lib/api";
import type { ProjectFormValues } from "../schema/project.schema";

let cache: Project[] | null = null;

export function useProjects() {
  const [items, setItems] = useState<Project[]>(cache ?? []);
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
    getProjects(1, 100)
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
          adminToast.error("Gagal memuat proyek", msg);
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
    getProjects(1, 100)
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

  async function save(values: ProjectFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    if (values.imageFile) fd.append("image", values.imageFile);

    try {
      if (editId) {
        await updateProject(editId, fd);
        adminToast.success("Proyek diperbarui", `"${values.nama}" berhasil disimpan.`);
      } else {
        await createProject(fd);
        adminToast.success("Proyek ditambahkan", `"${values.nama}" berhasil ditambahkan.`);
      }
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan proyek";
      adminToast.error("Gagal menyimpan", msg);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deleteProject(id);
      adminToast.success("Proyek dihapus", "Data proyek berhasil dihapus.");
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus proyek";
      adminToast.error("Gagal menghapus", msg);
      throw err;
    }
  }

  return { items, loading, error, save, remove, reload: invalidate };
}
