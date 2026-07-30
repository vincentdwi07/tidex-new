package service

import (
	"context"
	"database/sql"
	"errors"

	"backend/internal/features/message/entity"
	"backend/internal/features/message/repository"
)

type MessageService interface {
	GetAll(ctx context.Context, limit, offset int) ([]entity.Message, error)
	GetByID(ctx context.Context, id int) (*entity.Message, error)
	Create(ctx context.Context, m *entity.Message) (*entity.Message, error)
	MarkAsRead(ctx context.Context, id int) error
	Delete(ctx context.Context, id int) error
	CountUnread(ctx context.Context) (int, error)
}

type messageService struct {
	repo repository.MessageRepository
}

func NewMessageService(repo repository.MessageRepository) MessageService {
	return &messageService{repo: repo}
}

func (s *messageService) GetAll(ctx context.Context, limit, offset int) ([]entity.Message, error) {
	return s.repo.FindAll(ctx, limit, offset)
}

func (s *messageService) GetByID(ctx context.Context, id int) (*entity.Message, error) {
	m, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("pesan tidak ditemukan")
		}
		return nil, err
	}
	return m, nil
}

func (s *messageService) Create(ctx context.Context, m *entity.Message) (*entity.Message, error) {
	id, err := s.repo.Create(ctx, m)
	if err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *messageService) MarkAsRead(ctx context.Context, id int) error {
	return s.repo.MarkAsRead(ctx, id)
}

func (s *messageService) Delete(ctx context.Context, id int) error {
	return s.repo.Delete(ctx, id)
}

func (s *messageService) CountUnread(ctx context.Context) (int, error) {
	return s.repo.CountUnread(ctx)
}
