package config

import (
	"bufio"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type Config struct {
	Port      string
	DBUrl     string
	JWTSecret string
	JWTExpiry int
	Env       string
}

func LoadConfig() *Config {
	cfg := &Config{
		Port:      "8000",
		DBUrl:     "postgres://postgres:postgres@localhost:5432/tidex?sslmode=disable",
		JWTSecret: "default_secret_key",
		JWTExpiry: 24,
		Env:       "development",
	}

	// Try .env in: working dir → parent dir → executable dir
	envPath := ".env"
	if _, err := os.Stat(envPath); os.IsNotExist(err) {
		// one level up (e.g. running from backend/cmd/)
		parent := filepath.Join("..", ".env")
		if _, err := os.Stat(parent); err == nil {
			envPath = parent
		} else if exe, err := os.Executable(); err == nil {
			// compiled binary location
			envPath = filepath.Join(filepath.Dir(exe), ".env")
		}
	}

	file, err := os.Open(envPath)
	if err != nil {
		return cfg
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}
		key := strings.TrimSpace(parts[0])
		val := strings.TrimSpace(parts[1])

		switch key {
		case "PORT":
			cfg.Port = val
		case "DB_URL":
			cfg.DBUrl = val
		case "JWT_SECRET":
			cfg.JWTSecret = val
		case "JWT_EXPIRY":
			if n, err := strconv.Atoi(val); err == nil {
				cfg.JWTExpiry = n
			}
		case "ENV":
			cfg.Env = val
		}
	}

	return cfg
}
