package route

import (
	"github.com/go-chi/chi/v5"

	"backend/internal/features/news/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterNewsRoutes(r chi.Router, h *handler.NewsHandler, jwtManager *utils.JWTManager) {
	r.Route("/news", func(r chi.Router) {
		// Public
		r.Get("/", h.GetAll)
		r.Get("/{id}", h.GetByID)

		// Protected
		r.Group(func(r chi.Router) {
			r.Use(middleware.JWTAuth(jwtManager))
			r.Post("/", h.Create)
			r.Put("/{id}", h.Update)
			r.Delete("/{id}", h.Delete)
		})
	})
}
