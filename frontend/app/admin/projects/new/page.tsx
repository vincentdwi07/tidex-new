"use client";

import { useProjects } from "@/features/Admin/projects/hooks/use-projects";
import ProjectForm from "@/features/Admin/projects/form/project-form";
import AdminPageHeader from "@/features/Admin/components/AdminPageHeader";
import { PROJECTS_TITLE } from "@/features/Admin/projects/constant/projects.constant";
import type { ProjectFormValues } from "@/features/Admin/projects/schema/project.schema";

export default function AdminProjectNewPage() {
  const { save } = useProjects();

  async function handleSubmit(
    values: ProjectFormValues,
    editId: number | null,
  ) {
    await save(values, editId);
  }

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Tambah Proyek"
        breadcrumbs={[
          { label: PROJECTS_TITLE, href: "/admin/projects" },
          { label: "Tambah Proyek" },
        ]}
      />
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
}
