import { apiFetch } from "./client";
import type { ApiResponse, PaginatedResponse, Product } from "./types";

export async function getProducts(page = 1, limit = 12) {
  return apiFetch<PaginatedResponse<Product>>(
    `/products?page=${page}&limit=${limit}`
  );
}

export async function getProductById(id: number) {
  return apiFetch<ApiResponse<Product>>(`/products/${id}`);
}

export async function createProduct(form: FormData) {
  return apiFetch<ApiResponse<Product>>("/products", {
    method: "POST",
    auth: true,
    body: form,
  });
}

export async function updateProduct(id: number, form: FormData) {
  return apiFetch<ApiResponse<Product>>(`/products/${id}`, {
    method: "PUT",
    auth: true,
    body: form,
  });
}

export async function deleteProduct(id: number) {
  return apiFetch<ApiResponse<null>>(`/products/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
