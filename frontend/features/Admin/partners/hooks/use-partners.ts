"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "@/lib/api";
import type { Partner } from "@/lib/api";
import type { PartnerFormValues } from "../schema/partner.schema";

export function usePartners() {
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPartners(1, 50);
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

  async function save(values: PartnerFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    fd.append("website_url", values.website_url);
    if (values.imageFile) fd.append("image", values.imageFile);

    if (editId) {
      await updatePartner(editId, fd);
    } else {
      await createPartner(fd);
    }
    await load();
  }

  async function remove(id: number) {
    await deletePartner(id);
    await load();
  }

  return { items, loading, error, save, remove, reload: load };
}
