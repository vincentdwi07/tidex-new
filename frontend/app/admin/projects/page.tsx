"use client";

import Link from "next/link";
import { useProjects } from "@/features/Admin/projects/hooks/use-projects";
import ProjectList from "@/features/Admin/projects/list/project-list";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import TableSkeleton from "@/features/Admin/components/TableSkeleton";

export default function AdminProjectsPage() {
  const { items, loading, remove } = useProjects();

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Proyek"
        description="Tampilkan portofolio proyek yang telah diselesaikan."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <span className="text-base leading-none">+</span>
            Tambah Proyek
          </Link>
        }
      />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <ProjectList items={items} onDelete={remove} />
      )}
    </div>
  );
}
