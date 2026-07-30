"use client";

import { use } from "react";
import { useNews } from "@/features/Admin/news/hooks/use-news";
import NewsForm from "@/features/Admin/news/form/news-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { NEWS_TITLE } from "@/features/Admin/news/constant/news.constant";
import type { NewsFormValues } from "@/features/Admin/news/schema/news.schema";

export default function AdminNewsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { items, save } = useNews();

  const item = items.find((n) => n.id === Number(id)) ?? null;

  async function handleSubmit(values: NewsFormValues, editId: number | null) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Edit Berita"
        breadcrumbs={[
          { label: NEWS_TITLE, href: "/admin/news" },
          { label: item?.judul ?? "Edit Berita" },
        ]}
      />
      {item ? (
        <NewsForm initial={item} onSubmit={handleSubmit} />
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Memuat data...
        </div>
      )}
    </div>
  );
}
