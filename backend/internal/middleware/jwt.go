package middleware

import (
	"context"
	"net/http"
	"strings"

	"backend/internal/utils"
)

type contextKey string

const UserContextKey contextKey = "user_claims"
const RawTokenKey contextKey = "raw_token"

func JWTAuth(jwtManager *utils.JWTManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			var tokenStr string

			// Try Authorization header first
			authHeader := r.Header.Get("Authorization")
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
			}

			// Fallback to cookie
			if tokenStr == "" {
				cookie, err := r.Cookie("token")
				if err == nil {
					tokenStr = cookie.Value
				}
			}

			if tokenStr == "" {
				http.Error(w, `{"success":false,"message":"Unauthorized"}`, http.StatusUnauthorized)
				return
			}

			if jwtManager.IsTokenBlacklisted(tokenStr) {
				http.Error(w, `{"success":false,"message":"Token has been revoked"}`, http.StatusUnauthorized)
				return
			}

			claims, err := jwtManager.VerifyToken(tokenStr)
			if err != nil {
				http.Error(w, `{"success":false,"message":"Invalid or expired token"}`, http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), UserContextKey, claims)
			ctx = context.WithValue(ctx, RawTokenKey, tokenStr)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
