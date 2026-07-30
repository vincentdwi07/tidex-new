package route

import (
	"time"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/visitor/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterVisitorRoutes(r chi.Router, h *handler.VisitorHandler, jwtManager *utils.JWTManager) {
	// Public: track visitor — max 30 per menit per IP (anti-inflate)
	r.With(middleware.RateLimit(30, time.Minute)).Post("/visitors/track", h.Track)

	r.Group(func(r chi.Router) {
		r.Use(middleware.JWTAuth(jwtManager))
		r.Get("/visitors/stats", h.Stats) // protected — admin only
	})
}
