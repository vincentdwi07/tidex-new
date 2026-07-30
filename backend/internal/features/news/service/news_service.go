package service

import (
	"context"
	"database/sql"
	"errors"
	"mime/multipart"

	"backend/internal/features/news/entity"
	"backend/internal/features/news/repository"
	"backend/internal/utils/filestore"
)

type NewsService interface {
	GetAll(ctx context.Context, limit, offset int) ([]entity.News, error)
	GetByID(ctx context.Context, id int) (*entity.News, error)
	Create(ctx context.Context, n *entity.News, file multipart.File, header *multipart.FileHeader) (*entity.News, error)
	Update(ctx context.Context, id int, n *entity.News, file multipart.File, header *multipart.FileHeader) (*entity.News, error)
	Delete(ctx context.Context, id int) error
}

type newsService struct {
	repo     repository.NewsRepository
	uploader *filestore.FileUploader
}

func NewNewsService(repo repository.NewsRepository, uploader *filestore.FileUploader) NewsService {
	return &newsService{repo: repo, uploader: uploader}
}

func (s *newsService) GetAll(ctx context.Context, limit, offset int) ([]entity.News, error) {
	return s.repo.FindAll(ctx, limit, offset)
}

func (s *newsService) GetByID(ctx context.Context, id int) (*entity.News, error) {
	n, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("berita tidak ditemukan")
		}
		return nil, err
	}
	return n, nil
}

func (s *newsService) Create(ctx context.Context, n *entity.News, file multipart.File, header *multipart.FileHeader) (*entity.News, error) {
	if file != nil {
		url, err := s.uploader.UploadFile(file, header, "news")
		if err != nil {
			return nil, err
		}
		n.ImgURL = url
	}
	id, err := s.repo.Create(ctx, n)
	if err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *newsService) Update(ctx context.Context, id int, n *entity.News, file multipart.File, header *multipart.FileHeader) (*entity.News, error) {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("berita tidak ditemukan")
		}
		return nil, err
	}
	n.ImgURL = existing.ImgURL
	if file != nil {
		s.uploader.DeleteFile(existing.ImgURL)
		url, err := s.uploader.UploadFile(file, header, "news")
		if err != nil {
			return nil, err
		}
		n.ImgURL = url
	}
	n.ID = id
	if err := s.repo.Update(ctx, n); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *newsService) Delete(ctx context.Context, id int) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("berita tidak ditemukan")
		}
		return err
	}
	s.uploader.DeleteFile(existing.ImgURL)
	return s.repo.Delete(ctx, id)
}
