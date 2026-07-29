package route

import (
	"github.com/go-chi/chi/v5"

	"backend/internal/features/partner/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterPartnerRoutes(r chi.Router, h *handler.PartnerHandler, jwtManager *utils.JWTManager) {
	r.Route("/partners", func(r chi.Router) {
		r.Get("/", h.GetAll)
		r.Get("/{id}", h.GetByID)

		r.Group(func(r chi.Router) {
			r.Use(middleware.JWTAuth(jwtManager))
			r.Post("/", h.Create)
			r.Put("/{id}", h.Update)
			r.Delete("/{id}", h.Delete)
		})
	})
}
