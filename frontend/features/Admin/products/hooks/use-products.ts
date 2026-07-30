"use client";

import { useState, useEffect } from "react";
import { adminToast } from "@/features/Admin/components/AdminToast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import type { Product } from "@/lib/api";
import type { ProductFormValues } from "../schema/product.schema";

// In-memory cache — persists across navigation within the same session
let cache: Product[] | null = null;

export function useProducts() {
  const [items, setItems] = useState<Product[]>(cache ?? []);
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
    getProducts(1, 100)
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
          adminToast.error("Gagal memuat produk", msg);
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
    getProducts(1, 100)
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

  async function save(values: ProductFormValues, editId: number | null) {
    const fd = new FormData();
    fd.append("nama", values.nama);
    fd.append("deskripsi", values.deskripsi);
    fd.append("kategori", values.kategori);
    fd.append("logos", values.logos ?? "");
    if (values.imageFile) fd.append("image", values.imageFile);

    try {
      if (editId) {
        await updateProduct(editId, fd);
        adminToast.success("Produk diperbarui", `"${values.nama}" berhasil disimpan.`);
      } else {
        await createProduct(fd);
        adminToast.success("Produk ditambahkan", `"${values.nama}" berhasil ditambahkan.`);
      }
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan produk";
      adminToast.error("Gagal menyimpan", msg);
      throw err;
    }
  }

  async function remove(id: number) {
    try {
      await deleteProduct(id);
      adminToast.success("Produk dihapus", "Data produk berhasil dihapus.");
      invalidate();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal menghapus produk";
      adminToast.error("Gagal menghapus", msg);
      throw err;
    }
  }

  return { items, loading, error, save, remove, reload: invalidate };
}
