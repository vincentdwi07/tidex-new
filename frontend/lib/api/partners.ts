import { apiFetch } from "./client";
import type { ApiResponse, PaginatedResponse, Partner } from "./types";

export async function getPartners(page = 1, limit = 20) {
  return apiFetch<PaginatedResponse<Partner>>(
    `/partners?page=${page}&limit=${limit}`
  );
}

export async function getPartnerById(id: number) {
  return apiFetch<ApiResponse<Partner>>(`/partners/${id}`);
}

export async function createPartner(form: FormData) {
  return apiFetch<ApiResponse<Partner>>("/partners", {
    method: "POST",
    auth: true,
    body: form,
  });
}

export async function updatePartner(id: number, form: FormData) {
  return apiFetch<ApiResponse<Partner>>(`/partners/${id}`, {
    method: "PUT",
    auth: true,
    body: form,
  });
}

export async function deletePartner(id: number) {
  return apiFetch<ApiResponse<null>>(`/partners/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
