package service

import (
	"context"
	"database/sql"
	"errors"
	"mime/multipart"

	"backend/internal/features/partner/entity"
	"backend/internal/features/partner/repository"
	"backend/internal/utils/filestore"
)

type PartnerService interface {
	GetAll(ctx context.Context) ([]entity.Partner, error)
	GetByID(ctx context.Context, id int) (*entity.Partner, error)
	Create(ctx context.Context, nama string, file multipart.File, header *multipart.FileHeader) (*entity.Partner, error)
	Update(ctx context.Context, id int, nama string, file multipart.File, header *multipart.FileHeader) (*entity.Partner, error)
	Delete(ctx context.Context, id int) error
}

type partnerService struct {
	repo     repository.PartnerRepository
	uploader *filestore.FileUploader
}

func NewPartnerService(repo repository.PartnerRepository, uploader *filestore.FileUploader) PartnerService {
	return &partnerService{repo: repo, uploader: uploader}
}

func (s *partnerService) GetAll(ctx context.Context) ([]entity.Partner, error) {
	return s.repo.FindAll(ctx)
}

func (s *partnerService) GetByID(ctx context.Context, id int) (*entity.Partner, error) {
	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("partner tidak ditemukan")
		}
		return nil, err
	}
	return p, nil
}

func (s *partnerService) Create(ctx context.Context, nama string, file multipart.File, header *multipart.FileHeader) (*entity.Partner, error) {
	imgURL := ""
	if file != nil {
		url, err := s.uploader.UploadFile(file, header, "partners")
		if err != nil {
			return nil, err
		}
		imgURL = url
	}

	p := &entity.Partner{Nama: nama, ImgURL: imgURL}
	id, err := s.repo.Create(ctx, p)
	if err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *partnerService) Update(ctx context.Context, id int, nama string, file multipart.File, header *multipart.FileHeader) (*entity.Partner, error) {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("partner tidak ditemukan")
		}
		return nil, err
	}

	imgURL := existing.ImgURL
	if file != nil {
		s.uploader.DeleteFile(existing.ImgURL)
		url, err := s.uploader.UploadFile(file, header, "partners")
		if err != nil {
			return nil, err
		}
		imgURL = url
	}

	p := &entity.Partner{ID: id, Nama: nama, ImgURL: imgURL}
	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}
	return s.repo.FindByID(ctx, id)
}

func (s *partnerService) Delete(ctx context.Context, id int) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("partner tidak ditemukan")
		}
		return err
	}
	s.uploader.DeleteFile(existing.ImgURL)
	return s.repo.Delete(ctx, id)
}
