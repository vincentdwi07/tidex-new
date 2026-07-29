package service

import (
	"context"
	"database/sql"
	"errors"
	"strings"

	"backend/internal/auth/dto"
	"backend/internal/auth/entity"
	"backend/internal/auth/repository"
	"backend/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	Login(ctx context.Context, req *dto.LoginRequest) (*dto.LoginResponse, error)
	GetUserByID(ctx context.Context, id int) (*entity.User, error)
}

type authService struct {
	repo       repository.AuthRepository
	jwtManager *utils.JWTManager
}

func NewAuthService(repo repository.AuthRepository, jwtManager *utils.JWTManager) AuthService {
	return &authService{repo: repo, jwtManager: jwtManager}
}

func (s *authService) Login(ctx context.Context, req *dto.LoginRequest) (*dto.LoginResponse, error) {
	user, err := s.repo.FindByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("email atau password salah")
		}
		return nil, err
	}

	// Normalize $2y$ (PHP bcrypt) to $2a$ which Go's bcrypt accepts
	hash := user.Password
	if strings.HasPrefix(hash, "$2y$") {
		hash = "$2a$" + hash[4:]
	}
	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(req.Password)); err != nil {
		return nil, errors.New("email atau password salah")
	}

	token, err := s.jwtManager.GenerateToken(user.ID, user.Email, user.Name)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		ID:          user.ID,
		Email:       user.Email,
		Name:        user.Name,
		AccessToken: token,
	}, nil
}

func (s *authService) GetUserByID(ctx context.Context, id int) (*entity.User, error) {
	// For /me endpoint — we just return claims info, no extra DB call needed
	// but we keep this for future use
	return nil, nil
}
