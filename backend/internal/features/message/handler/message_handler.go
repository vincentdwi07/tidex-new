package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/message/entity"
	"backend/internal/features/message/repository"
	"backend/internal/features/message/service"
	"backend/internal/response"
	"backend/internal/utils/common"
)

const maxMessagesPerDay = 5

type MessageHandler struct {
	service service.MessageService
	repo    repository.MessageRepository
}

func NewMessageHandler(svc service.MessageService, repo repository.MessageRepository) *MessageHandler {
	return &MessageHandler{service: svc, repo: repo}
}

// extractIP gets the real client IP, respecting X-Forwarded-For / X-Real-IP proxies.
func extractIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// X-Forwarded-For can be a comma-separated list; take the first
		parts := strings.Split(xff, ",")
		return strings.TrimSpace(parts[0])
	}
	if xri := r.Header.Get("X-Real-IP"); xri != "" {
		return strings.TrimSpace(xri)
	}
	// Fall back to RemoteAddr (strip port)
	host := r.RemoteAddr
	if idx := strings.LastIndex(host, ":"); idx != -1 {
		host = host[:idx]
	}
	return host
}

func (h *MessageHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	p := common.GetPaginationParams(r, 20)
	data, err := h.service.GetAll(r.Context(), p.Limit, p.Offset)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	next := common.NextPage(p.Page, p.Limit, len(data))
	response.SuccessPaginated(w, http.StatusOK, "OK", data, &response.PaginationMetadata{
		Page:     p.Page,
		Limit:    p.Limit,
		NextPage: next,
	})
}

func (h *MessageHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	data, err := h.service.GetByID(r.Context(), id)
	if err != nil {
		response.Error(w, http.StatusNotFound, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", data)
}

func (h *MessageHandler) Create(w http.ResponseWriter, r *http.Request) {
	var m entity.Message
	if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
		response.Error(w, http.StatusBadRequest, "Format JSON tidak valid")
		return
	}
	if m.Nama == "" || m.Email == "" || m.Pesan == "" {
		response.Error(w, http.StatusBadRequest, "Nama, email, dan pesan wajib diisi")
		return
	}

	// Rate limit: max 5 messages per IP per 24 hours
	ip := extractIP(r)
	count, err := h.repo.CountTodayByIP(r.Context(), ip)
	if err == nil && count >= maxMessagesPerDay {
		response.Error(w, http.StatusTooManyRequests, "Terlalu banyak pesan. Coba lagi besok.")
		return
	}

	m.IPAddress = ip
	data, err := h.service.Create(r.Context(), &m)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusCreated, "Pesan berhasil dikirim", data)
}

func (h *MessageHandler) MarkAsRead(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.MarkAsRead(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Pesan ditandai sudah dibaca", nil)
}

func (h *MessageHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Pesan berhasil dihapus", nil)
}

func (h *MessageHandler) UnreadCount(w http.ResponseWriter, r *http.Request) {
	count, err := h.service.CountUnread(r.Context())
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", map[string]int{"count": count})
}
