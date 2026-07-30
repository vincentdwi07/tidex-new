"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import AdminTable from "@/features/Admin/components/AdminTable";
import { getProjectColumns } from "./list.schema";
import type { Project } from "@/lib/api";

interface ProjectListProps {
  items: Project[];
  onDelete: (id: number) => void;
}

export default function ProjectList({ items, onDelete }: ProjectListProps) {
  const columns = useMemo(() => getProjectColumns(onDelete), [onDelete]);

  return (
    <AdminTable
      data={items}
      columns={columns}
      searchKeys={["nama"]}
      searchPlaceholder="Cari proyek..."
      emptyIcon={<FolderOpen className="w-10 h-10" />}
      emptyText="Belum ada proyek."
      emptyAction={
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        >
          + Tambah Proyek
        </Link>
      }
    />
  );
}
