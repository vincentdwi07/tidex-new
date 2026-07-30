package handler

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type StatsHandler struct {
	db *sql.DB
}

func NewStatsHandler(db *sql.DB) *StatsHandler {
	return &StatsHandler{db: db}
}

type DashboardStats struct {
	Products       int `json:"products"`
	Partners       int `json:"partners"`
	Projects       int `json:"projects"`
	News           int `json:"news"`
	UnreadMessages int `json:"unread_messages"`
}

// GET /api/v1/stats
func (h *StatsHandler) Dashboard(w http.ResponseWriter, r *http.Request) {
	var stats DashboardStats

	type query struct {
		label string
		sql   string
		dest  *int
	}

	queries := []query{
		{"products", "SELECT COUNT(*) FROM our_product", &stats.Products},
		{"partners", "SELECT COUNT(*) FROM our_partner", &stats.Partners},
		{"projects", "SELECT COUNT(*) FROM our_project", &stats.Projects},
		{"news", "SELECT COUNT(*) FROM news", &stats.News},
		{"messages", `SELECT COUNT(*) FROM message_admin WHERE "isNew" = true`, &stats.UnreadMessages},
	}

	for _, q := range queries {
		row := h.db.QueryRowContext(r.Context(), q.sql)
		if err := row.Scan(q.dest); err != nil {
			log.Printf("[stats] query '%s' failed: %v | sql: %s", q.label, err, q.sql)
			http.Error(w, `{"error":"gagal mengambil statistik"}`, http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}
