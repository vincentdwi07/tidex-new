package route

import (
	"time"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/message/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterMessageRoutes(r chi.Router, h *handler.MessageHandler, jwtManager *utils.JWTManager) {
	// Public: send a message — max 3 per 10 menit per IP (anti-spam)
	r.With(middleware.RateLimit(3, 10*time.Minute)).Post("/messages", h.Create)

	// Protected: read / manage messages
	r.Group(func(r chi.Router) {
		r.Use(middleware.JWTAuth(jwtManager))
		r.Get("/messages", h.GetAll)
		r.Get("/messages/unread-count", h.UnreadCount)
		r.Get("/messages/{id}", h.GetByID)
		r.Patch("/messages/{id}/read", h.MarkAsRead)
		r.Delete("/messages/{id}", h.Delete)
	})
}
