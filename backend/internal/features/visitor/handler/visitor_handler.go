package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"backend/internal/features/visitor/entity"
	"backend/internal/features/visitor/service"
)

type VisitorHandler struct {
	svc service.VisitorService
}

func NewVisitorHandler(svc service.VisitorService) *VisitorHandler {
	return &VisitorHandler{svc: svc}
}

// POST /api/v1/visitors/track
func (h *VisitorHandler) Track(w http.ResponseWriter, r *http.Request) {
	ip := r.RemoteAddr

	var body struct {
		IP string `json:"ip"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err == nil && body.IP != "" {
		ip = body.IP
	}

	if err := h.svc.Track(r.Context(), ip); err != nil {
		log.Printf("[visitor] Track error (ip=%s): %v", ip, err)
		http.Error(w, `{"error":"gagal mencatat pengunjung"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"ok":true}`))
}

// GET /api/v1/visitors/stats?days=30
func (h *VisitorHandler) Stats(w http.ResponseWriter, r *http.Request) {
	days := 30
	if d := r.URL.Query().Get("days"); d != "" {
		if n, err := strconv.Atoi(d); err == nil {
			days = n
		}
	}

	stats, err := h.svc.GetDailyStats(r.Context(), days)
	if err != nil {
		log.Printf("[visitor] Stats error (days=%d): %v", days, err)
		http.Error(w, `{"error":"gagal mengambil statistik"}`, http.StatusInternalServerError)
		return
	}

	// Always return an array, never null
	if stats == nil {
		stats = []entity.VisitorStat{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}
