"use client";

import { useState, useEffect } from "react";
import { adminToast } from "@/features/Admin/components/AdminToast";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "@/lib/api";
import type { Partner } from "@/lib/api";
import type { PartnerFormValues } from "../schema/partner.schema";

let cache: Partner[] | null = null;

export function usePartners() {
  const [items, setItems] = useState<Partner[]>(cache ?? []);
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
    getPartners(1, 100)
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
          adminToast.error("Gagal memuat partner", msg);
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
    getPartners(1, 100)
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

  async function save(values: PartnerFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    if (values.imageFile) fd.append("image", values.imageFile);

    try {
      if (editId) {
        await updatePartner(editId, fd);
        adminToast.success("Partner diperbarui", `"${values.nama}" berhasil disimpan.`);
      } else {
        await createPartner(fd);
        adminToast.success("Partner ditambahkan", `"${values.nama}" berhasil ditambahkan.`);
      }
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan partner";
      adminToast.error("Gagal menyimpan", msg);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deletePartner(id);
      adminToast.success("Partner dihapus", "Data partner berhasil dihapus.");
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus partner";
      adminToast.error("Gagal menghapus", msg);
      throw err;
    }
  }

  return { items, loading, error, save, remove, reload: invalidate };
}
