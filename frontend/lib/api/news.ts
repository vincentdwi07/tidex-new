import { apiFetch } from "./client";
import type { ApiResponse, PaginatedResponse, News } from "./types";

export async function getNews(page = 1, limit = 10, publishedOnly = true) {
  const q = publishedOnly ? "&published=true" : "";
  return apiFetch<PaginatedResponse<News>>(
    `/news?page=${page}&limit=${limit}${q}`
  );
}

export async function getNewsById(id: number) {
  return apiFetch<ApiResponse<News>>(`/news/${id}`);
}

export async function getNewsBySlug(slug: string) {
  return apiFetch<ApiResponse<News>>(`/news/slug/${slug}`);
}

export async function createNews(form: FormData) {
  return apiFetch<ApiResponse<News>>("/news", {
    method: "POST",
    auth: true,
    body: form,
  });
}

export async function updateNews(id: number, form: FormData) {
  return apiFetch<ApiResponse<News>>(`/news/${id}`, {
    method: "PUT",
    auth: true,
    body: form,
  });
}

export async function deleteNews(id: number) {
  return apiFetch<ApiResponse<null>>(`/news/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
