package middleware

import (
	"net"
	"net/http"
	"strings"
	"sync"
	"time"
)

type rateLimiter struct {
	mu      sync.Mutex
	clients map[string]*clientState
	limit   int
	window  time.Duration
}

type clientState struct {
	count   int
	resetAt time.Time
}

func newRateLimiter(limit int, window time.Duration) *rateLimiter {
	rl := &rateLimiter{
		clients: make(map[string]*clientState),
		limit:   limit,
		window:  window,
	}
	go rl.cleanup()
	return rl
}

func (rl *rateLimiter) cleanup() {
	ticker := time.NewTicker(10 * time.Minute)
	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		for ip, state := range rl.clients {
			if now.After(state.resetAt) {
				delete(rl.clients, ip)
			}
		}
		rl.mu.Unlock()
	}
}

func (rl *rateLimiter) allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	state, exists := rl.clients[ip]
	if !exists || now.After(state.resetAt) {
		rl.clients[ip] = &clientState{count: 1, resetAt: now.Add(rl.window)}
		return true
	}

	if state.count >= rl.limit {
		return false
	}

	state.count++
	return true
}

// realIP extracts the client IP safely.
// X-Forwarded-For can contain multiple IPs (client, proxy1, proxy2).
// We take the first entry which is the original client IP, then strip port from RemoteAddr.
func realIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		// Take only the first (leftmost) IP — the actual client
		if idx := len(xff); idx > 0 {
			first := xff
			for i, c := range xff {
				if c == ',' {
					first = xff[:i]
					break
				}
			}
			// trim whitespace
			trimmed := strings.TrimSpace(first)
			if trimmed != "" {
				return trimmed
			}
		}
	}
	// Strip port from RemoteAddr (e.g. "1.2.3.4:5678" → "1.2.3.4")
	ip := r.RemoteAddr
	if host, _, err := net.SplitHostPort(ip); err == nil {
		return host
	}
	return ip
}

func RateLimit(limit int, window time.Duration) func(http.Handler) http.Handler {
	rl := newRateLimiter(limit, window)
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := realIP(r)
			if !rl.allow(ip) {
				w.Header().Set("Content-Type", "application/json")
				http.Error(w, `{"success":false,"message":"Too many requests, coba lagi nanti"}`, http.StatusTooManyRequests)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
