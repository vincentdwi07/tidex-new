import { apiFetch } from "./client";
import type { ApiResponse, LoginPayload, LoginResponse } from "./types";

export async function login(payload: LoginPayload) {
  return apiFetch<ApiResponse<LoginResponse>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout(token: string) {
  return apiFetch<ApiResponse<null>>("/auth/logout", {
    method: "POST",
    auth: true,
    headers: { Authorization: `Bearer ${token}` },
  });
}
