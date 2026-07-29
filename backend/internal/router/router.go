package router

import (
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"

	"backend/internal/auth/handler"
	"backend/internal/middleware"
	"backend/internal/utils"

	messagehandler "backend/internal/features/message/handler"
	newshandler "backend/internal/features/news/handler"
	partnerhandler "backend/internal/features/partner/handler"
	producthandler "backend/internal/features/product/handler"
	projecthandler "backend/internal/features/project/handler"

	authroute "backend/internal/auth/route"
	messageroute "backend/internal/features/message/route"
	newsroute "backend/internal/features/news/route"
	partnerroute "backend/internal/features/partner/route"
	productroute "backend/internal/features/product/route"
	projectroute "backend/internal/features/project/route"
)

type Handlers struct {
	Auth    *handler.AuthHandler
	Product *producthandler.ProductHandler
	Partner *partnerhandler.PartnerHandler
	Project *projecthandler.ProjectHandler
	Message *messagehandler.MessageHandler
	News    *newshandler.NewsHandler
}

func New(jwtManager *utils.JWTManager, h *Handlers, uploadsDir string) http.Handler {
	r := chi.NewRouter()

	// Global middleware
	r.Use(chimiddleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.CORS)
	r.Use(middleware.RateLimit(100, time.Minute))

	// Serve uploaded files
	r.Get("/uploads/*", http.StripPrefix("/uploads", http.FileServer(http.Dir(uploadsDir))).ServeHTTP)

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok"}`))
	})

	// API v1
	r.Route("/api/v1", func(r chi.Router) {
		authroute.RegisterAuthRoutes(r, h.Auth, jwtManager)
		productroute.RegisterProductRoutes(r, h.Product, jwtManager)
		partnerroute.RegisterPartnerRoutes(r, h.Partner, jwtManager)
		projectroute.RegisterProjectRoutes(r, h.Project, jwtManager)
		messageroute.RegisterMessageRoutes(r, h.Message, jwtManager)
		newsroute.RegisterNewsRoutes(r, h.News, jwtManager)
	})

	return r
}

// UploadsDir returns the absolute path to the uploads folder next to the binary.
func UploadsDir() string {
	exe, err := os.Executable()
	if err != nil {
		return "uploads"
	}
	return filepath.Join(filepath.Dir(exe), "uploads")
}
