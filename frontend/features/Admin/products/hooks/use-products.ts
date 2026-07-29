"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import type { Product } from "@/lib/api";
import type { ProductFormValues } from "../schema/product.schema";

export function useProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts(1, 50);
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

  async function save(values: ProductFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    fd.append("deskripsi", values.deskripsi);
    fd.append("kategori", values.kategori);
    if (values.imageFile) fd.append("image", values.imageFile);

    if (editId) {
      await updateProduct(editId, fd);
    } else {
      await createProduct(fd);
    }
    await load();
  }

  async function remove(id: number) {
    await deleteProduct(id);
    await load();
  }

  return { items, loading, error, save, remove, reload: load };
}
