package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"backend/internal/auth/handler"
	authrepo "backend/internal/auth/repository"
	authservice "backend/internal/auth/service"
	"backend/internal/config"
	"backend/internal/database"
	messagehandler "backend/internal/features/message/handler"
	messagerepo "backend/internal/features/message/repository"
	messageservice "backend/internal/features/message/service"
	newshandler "backend/internal/features/news/handler"
	newsrepo "backend/internal/features/news/repository"
	newsservice "backend/internal/features/news/service"
	partnerhandler "backend/internal/features/partner/handler"
	partnerrepo "backend/internal/features/partner/repository"
	partnerservice "backend/internal/features/partner/service"
	producthandler "backend/internal/features/product/handler"
	productrepo "backend/internal/features/product/repository"
	productservice "backend/internal/features/product/service"
	projecthandler "backend/internal/features/project/handler"
	projectrepo "backend/internal/features/project/repository"
	projectservice "backend/internal/features/project/service"
	"backend/internal/router"
	"backend/internal/utils"
	"backend/internal/utils/filestore"
	"backend/internal/validator"
)

func main() {
	cfg := config.LoadConfig()

	// Database
	db := database.InitPostgres(cfg.DBUrl)
	defer db.Close()

	// JWT
	jwtManager := utils.NewJWTManager(cfg.JWTSecret, cfg.JWTExpiry)

	// Uploads directory — use UPLOADS_DIR env var if set,
	// otherwise default to ./uploads relative to working directory.
	// NOTE: os.Executable() is NOT used because `go run` returns a temp path.
	uploadsDir := os.Getenv("UPLOADS_DIR")
	if uploadsDir == "" {
		wd, err := os.Getwd()
		if err != nil {
			log.Fatalf("cannot get working directory: %v", err)
		}
		uploadsDir = filepath.Join(wd, "uploads")
	}
	uploader := filestore.NewFileUploader(uploadsDir, "/uploads")

	// Validator
	v := validator.NewValidator()

	// Auth
	aRepo := authrepo.NewAuthRepository(db)
	aSvc := authservice.NewAuthService(aRepo, jwtManager)
	aHandler := handler.NewAuthHandler(aSvc, v, jwtManager)

	// Product
	prodRepo := productrepo.NewProductRepository(db)
	prodSvc := productservice.NewProductService(prodRepo, uploader)
	prodHandler := producthandler.NewProductHandler(prodSvc, v)

	// Partner
	partRepo := partnerrepo.NewPartnerRepository(db)
	partSvc := partnerservice.NewPartnerService(partRepo, uploader)
	partHandler := partnerhandler.NewPartnerHandler(partSvc)

	// Project
	projRepo := projectrepo.NewProjectRepository(db)
	projSvc := projectservice.NewProjectService(projRepo, uploader)
	projHandler := projecthandler.NewProjectHandler(projSvc)

	// Message
	msgRepo := messagerepo.NewMessageRepository(db)
	msgSvc := messageservice.NewMessageService(msgRepo)
	msgHandler := messagehandler.NewMessageHandler(msgSvc)

	// News
	newsRepo := newsrepo.NewNewsRepository(db)
	newsSvc := newsservice.NewNewsService(newsRepo, uploader)
	newsH := newshandler.NewNewsHandler(newsSvc)

	// Router
	h := &router.Handlers{
		Auth:    aHandler,
		Product: prodHandler,
		Partner: partHandler,
		Project: projHandler,
		Message: msgHandler,
		News:    newsH,
	}

	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      router.New(jwtManager, h, uploadsDir),
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Server starting on port %s", cfg.Port)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server error: %v", err)
	}
}
