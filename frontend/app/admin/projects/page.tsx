"use client";

import { useState } from "react";
import { useProjects } from "@/features/Admin/projects/hooks/use-projects";
import ProjectList from "@/features/Admin/projects/list/project-list";
import ProjectForm from "@/features/Admin/projects/form/project-form";
import { PROJECTS_TITLE } from "@/features/Admin/projects/constant/projects.constant";
import type { Project } from "@/lib/api";
import type { ProjectFormValues } from "@/features/Admin/projects/schema/project.schema";

export default function AdminProjectsPage() {
  const { items, loading, error, save, remove } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);

  function openCreate() {
    setEditItem(null);
    setShowForm(true);
  }

  function openEdit(item: Project) {
    setEditItem(item);
    setShowForm(true);
  }

  async function handleSubmit(
    values: ProjectFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{PROJECTS_TITLE}</h1>
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
            {editItem ? "Edit Proyek" : "Tambah Proyek"}
          </h2>
          <ProjectForm
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
        <ProjectList items={items} onEdit={openEdit} onDelete={remove} />
      )}
    </div>
  );
}
