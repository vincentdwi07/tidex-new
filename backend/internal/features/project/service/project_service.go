package service

import (
	"context"
	"database/sql"
	"errors"
	"mime/multipart"

	"backend/internal/features/project/entity"
	"backend/internal/features/project/repository"
	"backend/internal/utils/filestore"
)

type ProjectService interface {
	GetAll(ctx context.Context, limit, offset int) ([]entity.Project, error)
	GetByID(ctx context.Context, id int) (*entity.Project, error)
	Create(ctx context.Context, p *entity.Project, file multipart.File, header *multipart.FileHeader) (*entity.Project, error)
	Update(ctx context.Context, id int, p *entity.Project, file multipart.File, header *multipart.FileHeader) (*entity.Project, error)
	Delete(ctx context.Context, id int) error
}

type projectService struct {
	repo     repository.ProjectRepository
	uploader *filestore.FileUploader
}

func NewProjectService(repo repository.ProjectRepository, uploader *filestore.FileUploader) ProjectService {
	return &projectService{repo: repo, uploader: uploader}
}

func (s *projectService) GetAll(ctx context.Context, limit, offset int) ([]entity.Project, error) {
	return s.repo.FindAll(ctx, limit, offset)
}

func (s *projectService) GetByID(ctx context.Context, id int) (*entity.Project, error) {
	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("project tidak ditemukan")
		}
		return nil, err
	}
	return p, nil
}

func (s *projectService) Create(ctx context.Context, p *entity.Project, file multipart.File, header *multipart.FileHeader) (*entity.Project, error) {
	if file != nil {
		url, err := s.uploader.UploadFile(file, header, "projects")
		if err != nil {
			return nil, err
		}
		p.ImgURL = url
	}
	id, err := s.repo.Create(ctx, p)
	if err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *projectService) Update(ctx context.Context, id int, p *entity.Project, file multipart.File, header *multipart.FileHeader) (*entity.Project, error) {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("project tidak ditemukan")
		}
		return nil, err
	}
	p.ImgURL = existing.ImgURL
	if file != nil {
		s.uploader.DeleteFile(existing.ImgURL)
		url, err := s.uploader.UploadFile(file, header, "projects")
		if err != nil {
			return nil, err
		}
		p.ImgURL = url
	}
	p.ID = id
	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *projectService) Delete(ctx context.Context, id int) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("project tidak ditemukan")
		}
		return err
	}
	s.uploader.DeleteFile(existing.ImgURL)
	return s.repo.Delete(ctx, id)
}
