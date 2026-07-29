import { apiFetch } from "./client";
import type { ApiResponse, PaginatedResponse, Project } from "./types";

export async function getProjects(page = 1, limit = 12) {
  return apiFetch<PaginatedResponse<Project>>(
    `/projects?page=${page}&limit=${limit}`
  );
}

export async function getProjectById(id: number) {
  return apiFetch<ApiResponse<Project>>(`/projects/${id}`);
}

export async function createProject(form: FormData) {
  return apiFetch<ApiResponse<Project>>("/projects", {
    method: "POST",
    auth: true,
    body: form,
  });
}

export async function updateProject(id: number, form: FormData) {
  return apiFetch<ApiResponse<Project>>(`/projects/${id}`, {
    method: "PUT",
    auth: true,
    body: form,
  });
}

export async function deleteProject(id: number) {
  return apiFetch<ApiResponse<null>>(`/projects/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
