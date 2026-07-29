package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/auth/dto"
	"backend/internal/auth/service"
	"backend/internal/middleware"
	"backend/internal/response"
	"backend/internal/utils"
	"backend/internal/validator"
)

type AuthHandler struct {
	service    service.AuthService
	validator  *validator.Validator
	jwtManager *utils.JWTManager
}

func NewAuthHandler(svc service.AuthService, v *validator.Validator, jwtManager *utils.JWTManager) *AuthHandler {
	return &AuthHandler{service: svc, validator: v, jwtManager: jwtManager}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req dto.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.Error(w, http.StatusBadRequest, "Format JSON tidak valid")
		return
	}

	if errs := h.validator.Validate(req); errs != nil {
		response.ValidationError(w, "Validasi gagal", errs)
		return
	}

	result, err := h.service.Login(r.Context(), &req)
	if err != nil {
		response.Error(w, http.StatusUnauthorized, err.Error())
		return
	}

	// Set HttpOnly cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    result.AccessToken,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   int(24 * time.Hour / time.Second),
		SameSite: http.SameSiteLaxMode,
	})

	response.Success(w, http.StatusOK, "Login berhasil", result)
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	claims, ok := r.Context().Value(middleware.UserContextKey).(*utils.JWTClaims)
	if !ok {
		response.Error(w, http.StatusUnauthorized, "Unauthorized")
		return
	}
	response.Success(w, http.StatusOK, "OK", map[string]interface{}{
		"id":    claims.ID,
		"email": claims.Email,
		"name":  claims.Name,
	})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	rawToken, _ := r.Context().Value(middleware.RawTokenKey).(string)
	if rawToken != "" {
		claims, err := h.jwtManager.VerifyToken(rawToken)
		if err == nil && claims.ExpiresAt != nil {
			h.jwtManager.BlacklistToken(rawToken, claims.ExpiresAt.Time)
		}
	}

	// Clear cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})

	response.Success(w, http.StatusOK, "Logout berhasil", nil)
}
