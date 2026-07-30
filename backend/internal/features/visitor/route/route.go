package route

import (
	"github.com/go-chi/chi/v5"

	"backend/internal/features/visitor/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterVisitorRoutes(r chi.Router, h *handler.VisitorHandler, jwtManager *utils.JWTManager) {
	r.Post("/visitors/track", h.Track) // public — called from frontend

	r.Group(func(r chi.Router) {
		r.Use(middleware.JWTAuth(jwtManager))
		r.Get("/visitors/stats", h.Stats) // protected — admin only
	})
}
