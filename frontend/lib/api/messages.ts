import { apiFetch } from "./client";
import type { ApiResponse, PaginatedResponse, Message, MessagePayload } from "./types";

export async function getMessages(page = 1, limit = 20) {
  return apiFetch<PaginatedResponse<Message>>(
    `/messages?page=${page}&limit=${limit}`,
    { auth: true }
  );
}

export async function sendMessage(payload: MessagePayload) {
  return apiFetch<ApiResponse<Message>>("/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteMessage(id: number) {
  return apiFetch<ApiResponse<null>>(`/messages/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

export async function getUnreadMessageCount() {
  return apiFetch<ApiResponse<{ count: number }>>("/messages/unread-count", {
    auth: true,
  });
}

export async function markMessageAsRead(id: number) {
  return apiFetch<ApiResponse<null>>(`/messages/${id}/read`, {
    method: "PATCH",
    auth: true,
  });
}
