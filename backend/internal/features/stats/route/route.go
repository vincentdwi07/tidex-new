package route

import (
	"github.com/go-chi/chi/v5"

	"backend/internal/features/stats/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterStatsRoutes(r chi.Router, h *handler.StatsHandler, jwtManager *utils.JWTManager) {
	r.Group(func(r chi.Router) {
		r.Use(middleware.JWTAuth(jwtManager))
		r.Get("/stats", h.Dashboard)
	})
}
