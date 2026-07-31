"use client";

import { useProjects } from "@/features/Admin/projects/hooks/use-projects";
import ProjectForm from "@/features/Admin/projects/form/project-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PROJECTS_TITLE } from "@/features/Admin/projects/constant/projects.constant";
import type { ProjectFormValues } from "@/features/Admin/projects/schema/project.schema";

export default function ProjectEditPage({ id }: { id: string }) {
  const { items, save } = useProjects();
  const item = items.find((p) => p.id === Number(id)) ?? null;

  async function handleSubmit(
    values: ProjectFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Edit Proyek"
        breadcrumbs={[
          { label: PROJECTS_TITLE, href: "/admin/projects" },
          { label: item?.nama ?? "Edit Proyek" },
        ]}
      />
      {item ? (
        <ProjectForm initial={item} onSubmit={handleSubmit} />
      ) : (
        <div className="text-center py-16 text-gray-400 text-sm">
          Memuat data...
        </div>
      )}
    </div>
  );
}
