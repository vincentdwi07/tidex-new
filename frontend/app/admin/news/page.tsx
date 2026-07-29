"use client";

import { useState } from "react";
import { useNews } from "@/features/Admin/news/hooks/use-news";
import NewsList from "@/features/Admin/news/list/news-list";
import NewsForm from "@/features/Admin/news/form/news-form";
import { NEWS_TITLE } from "@/features/Admin/news/constant/news.constant";
import type { News } from "@/lib/api";
import type { NewsFormValues } from "@/features/Admin/news/schema/news.schema";

export default function AdminNewsPage() {
  const { items, loading, error, save, remove } = useNews();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<News | null>(null);

  function openCreate() {
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item: News) {
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSubmit(values: NewsFormValues, editId: number | null) {
    await save(values, editId);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{NEWS_TITLE}</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          + Tambah
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-medium text-white mb-4">
            {editItem ? "Edit Berita" : "Tambah Berita"}
          </h2>
          <NewsForm
            initial={editItem}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-500 text-sm">
          Memuat data...
        </div>
      ) : (
        <NewsList items={items} onEdit={openEdit} onDelete={remove} />
      )}
    </div>
  );
}
