package utils

import (
	"errors"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTClaims struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	jwt.RegisteredClaims
}

type JWTManager struct {
	secret    string
	expiry    time.Duration
	blacklist map[string]time.Time
	mu        sync.RWMutex
}

func NewJWTManager(secret string, expiryHours int) *JWTManager {
	m := &JWTManager{
		secret:    secret,
		expiry:    time.Duration(expiryHours) * time.Hour,
		blacklist: make(map[string]time.Time),
	}
	go m.cleanupBlacklist()
	return m
}

func (m *JWTManager) GenerateToken(id int, email, name string) (string, error) {
	claims := &JWTClaims{
		ID:    id,
		Email: email,
		Name:  name,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(m.expiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(m.secret))
}

func (m *JWTManager) VerifyToken(tokenStr string) (*JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &JWTClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(m.secret), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*JWTClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}

func (m *JWTManager) BlacklistToken(tokenStr string, expiresAt time.Time) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.blacklist[tokenStr] = expiresAt
}

func (m *JWTManager) IsTokenBlacklisted(tokenStr string) bool {
	m.mu.RLock()
	defer m.mu.RUnlock()
	_, exists := m.blacklist[tokenStr]
	return exists
}

func (m *JWTManager) cleanupBlacklist() {
	ticker := time.NewTicker(1 * time.Hour)
	for range ticker.C {
		m.mu.Lock()
		now := time.Now()
		for token, exp := range m.blacklist {
			if now.After(exp) {
				delete(m.blacklist, token)
			}
		}
		m.mu.Unlock()
	}
}
