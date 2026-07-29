package route

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"backend/internal/auth/handler"
	"backend/internal/middleware"
	"backend/internal/utils"
)

func RegisterAuthRoutes(r chi.Router, h *handler.AuthHandler, jwtManager *utils.JWTManager) {
	r.Route("/auth", func(r chi.Router) {
		r.With(middleware.RateLimit(5, time.Minute)).Post("/login", h.Login)

		r.Group(func(r chi.Router) {
			r.Use(middleware.JWTAuth(jwtManager))
			r.Get("/me", h.Me)
			r.Post("/logout", h.Logout)
		})
	})
}

func FileServer(r chi.Router, path string, root http.FileSystem) {
	r.Get(path+"/*", http.StripPrefix(path, http.FileServer(root)).ServeHTTP)
}
