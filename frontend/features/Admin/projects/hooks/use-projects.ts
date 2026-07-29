"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/api";
import type { Project } from "@/lib/api";
import type { ProjectFormValues } from "../schema/project.schema";

export function useProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProjects(1, 50);
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

  async function save(values: ProjectFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    fd.append("deskripsi", values.deskripsi);
    fd.append("company_name", values.company_name);
    if (values.imageFile) fd.append("image", values.imageFile);

    if (editId) {
      await updateProject(editId, fd);
    } else {
      await createProject(fd);
    }
    await load();
  }

  async function remove(id: number) {
    await deleteProject(id);
    await load();
  }

  return { items, loading, error, save, remove, reload: load };
}
