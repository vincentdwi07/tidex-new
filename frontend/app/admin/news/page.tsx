"use client";

import Link from "next/link";
import { useNews } from "@/features/Admin/news/hooks/use-news";
import NewsList from "@/features/Admin/news/list/news-list";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import TableSkeleton from "@/features/Admin/components/TableSkeleton";

export default function AdminNewsPage() {
  const { items, loading, remove } = useNews();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Berita"
        description="Publikasikan artikel dan update terbaru perusahaan."
        action={
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Tambah Berita
          </Link>
        }
      />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <NewsList items={items} onDelete={remove} />
      )}
    </div>
  );
}
