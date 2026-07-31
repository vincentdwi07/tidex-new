"use client";

import { useNews } from "@/features/Admin/news/hooks/use-news";
import NewsForm from "@/features/Admin/news/form/news-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { NEWS_TITLE } from "@/features/Admin/news/constant/news.constant";
import type { NewsFormValues } from "@/features/Admin/news/schema/news.schema";

export default function NewsNewPage() {
  const { save } = useNews();

  async function handleSubmit(values: NewsFormValues, editId: number | null) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Tambah Berita"
        breadcrumbs={[
          { label: NEWS_TITLE, href: "/admin/news" },
          { label: "Tambah Berita" },
        ]}
      />
      <NewsForm onSubmit={handleSubmit} />
    </div>
  );
}
