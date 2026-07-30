package service

import (
	"context"

	"backend/internal/features/visitor/entity"
	"backend/internal/features/visitor/repository"
)

type VisitorService interface {
	Track(ctx context.Context, ip string) error
	GetDailyStats(ctx context.Context, days int) ([]entity.VisitorStat, error)
}

type visitorService struct {
	repo repository.VisitorRepository
}

func NewVisitorService(repo repository.VisitorRepository) VisitorService {
	return &visitorService{repo: repo}
}

func (s *visitorService) Track(ctx context.Context, ip string) error {
	if ip == "" {
		return nil
	}
	return s.repo.Track(ctx, ip)
}

func (s *visitorService) GetDailyStats(ctx context.Context, days int) ([]entity.VisitorStat, error) {
	if days <= 0 || days > 365 {
		days = 30
	}
	return s.repo.GetDailyStats(ctx, days)
}
