package service

import (
	"context"
	"database/sql"
	"errors"
	"mime/multipart"
	"strconv"
	"strings"

	"backend/internal/features/product/dto"
	"backend/internal/features/product/entity"
	"backend/internal/features/product/repository"
	"backend/internal/utils/filestore"
)

type ProductService interface {
	GetAll(ctx context.Context, search string) ([]dto.ProductResponse, error)
	GetByID(ctx context.Context, id int) (*dto.ProductResponse, error)
	Create(ctx context.Context, req *dto.CreateProductRequest, file multipart.File, header *multipart.FileHeader) (*dto.ProductResponse, error)
	Update(ctx context.Context, id int, req *dto.UpdateProductRequest, file multipart.File, header *multipart.FileHeader) (*dto.ProductResponse, error)
	Delete(ctx context.Context, id int) error
}

type productService struct {
	repo     repository.ProductRepository
	uploader *filestore.FileUploader
}

func NewProductService(repo repository.ProductRepository, uploader *filestore.FileUploader) ProductService {
	return &productService{repo: repo, uploader: uploader}
}

func (s *productService) GetAll(ctx context.Context, search string) ([]dto.ProductResponse, error) {
	return s.repo.FindAll(ctx, search)
}

func (s *productService) GetByID(ctx context.Context, id int) (*dto.ProductResponse, error) {
	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("produk tidak ditemukan")
		}
		return nil, err
	}
	return p, nil
}

func (s *productService) Create(ctx context.Context, req *dto.CreateProductRequest, file multipart.File, header *multipart.FileHeader) (*dto.ProductResponse, error) {
	imgURL := ""
	if file != nil {
		url, err := s.uploader.UploadFile(file, header, "products")
		if err != nil {
			return nil, err
		}
		imgURL = url
	}

	p := &entity.Product{
		Kategori:  req.Kategori,
		Nama:      req.Nama,
		ImgURL:    imgURL,
		Deskripsi: req.Deskripsi,
		Logos:     req.Logos,
	}

	id, err := s.repo.Create(ctx, p)
	if err != nil {
		return nil, err
	}

	if len(req.PartnerIDs) > 0 {
		if err := s.repo.SyncPartners(ctx, id, req.PartnerIDs); err != nil {
			return nil, err
		}
	}

	return s.repo.FindByID(ctx, id)
}

func (s *productService) Update(ctx context.Context, id int, req *dto.UpdateProductRequest, file multipart.File, header *multipart.FileHeader) (*dto.ProductResponse, error) {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("produk tidak ditemukan")
		}
		return nil, err
	}

	imgURL := existing.ImgURL
	if file != nil {
		// Delete old image
		s.uploader.DeleteFile(existing.ImgURL)
		// Upload new image
		url, err := s.uploader.UploadFile(file, header, "products")
		if err != nil {
			return nil, err
		}
		imgURL = url
	}

	p := &entity.Product{
		ID:        id,
		Kategori:  req.Kategori,
		Nama:      req.Nama,
		ImgURL:    imgURL,
		Deskripsi: req.Deskripsi,
		Logos:     req.Logos,
	}

	if err := s.repo.Update(ctx, p); err != nil {
		return nil, err
	}

	if err := s.repo.SyncPartners(ctx, id, req.PartnerIDs); err != nil {
		return nil, err
	}

	return s.repo.FindByID(ctx, id)
}

func (s *productService) Delete(ctx context.Context, id int) error {
	existing, err := s.repo.FindByID(ctx, id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return errors.New("produk tidak ditemukan")
		}
		return err
	}
	s.uploader.DeleteFile(existing.ImgURL)
	return s.repo.Delete(ctx, id)
}

// ParsePartnerIDs parses comma-separated or repeated form values into []int
func ParsePartnerIDs(values []string) []int {
	ids := []int{}
	for _, v := range values {
		for _, part := range strings.Split(v, ",") {
			part = strings.TrimSpace(part)
			if n, err := strconv.Atoi(part); err == nil {
				ids = append(ids, n)
			}
		}
	}
	return ids
}
