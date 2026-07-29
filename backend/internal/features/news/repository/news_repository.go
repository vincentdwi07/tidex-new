package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/news/entity"
)

type NewsRepository interface {
	FindAll(ctx context.Context, limit, offset int, publishedOnly bool) ([]entity.News, error)
	FindByID(ctx context.Context, id int) (*entity.News, error)
	FindBySlug(ctx context.Context, slug string) (*entity.News, error)
	Create(ctx context.Context, n *entity.News) (int, error)
	Update(ctx context.Context, n *entity.News) error
	Delete(ctx context.Context, id int) error
}

type postgresNewsRepository struct {
	db *sql.DB
}

func NewNewsRepository(db *sql.DB) NewsRepository {
	return &postgresNewsRepository{db: db}
}

func (r *postgresNewsRepository) FindAll(ctx context.Context, limit, offset int, publishedOnly bool) ([]entity.News, error) {
	query := `SELECT id, judul, slug, konten, imgURL, is_published, created_at, updated_at FROM news`
	if publishedOnly {
		query += ` WHERE is_published = true`
	}
	query += ` ORDER BY created_at DESC LIMIT $1 OFFSET $2`

	rows, err := r.db.QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var news []entity.News
	for rows.Next() {
		var n entity.News
		if err := rows.Scan(&n.ID, &n.Judul, &n.Slug, &n.Konten, &n.ImgURL, &n.IsPublished, &n.CreatedAt, &n.UpdatedAt); err != nil {
			return nil, err
		}
		news = append(news, n)
	}
	return news, nil
}

func (r *postgresNewsRepository) FindByID(ctx context.Context, id int) (*entity.News, error) {
	var n entity.News
	err := r.db.QueryRowContext(ctx,
		`SELECT id, judul, slug, konten, imgURL, is_published, created_at, updated_at FROM news WHERE id=$1`, id,
	).Scan(&n.ID, &n.Judul, &n.Slug, &n.Konten, &n.ImgURL, &n.IsPublished, &n.CreatedAt, &n.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &n, nil
}

func (r *postgresNewsRepository) FindBySlug(ctx context.Context, slug string) (*entity.News, error) {
	var n entity.News
	err := r.db.QueryRowContext(ctx,
		`SELECT id, judul, slug, konten, imgURL, is_published, created_at, updated_at FROM news WHERE slug=$1`, slug,
	).Scan(&n.ID, &n.Judul, &n.Slug, &n.Konten, &n.ImgURL, &n.IsPublished, &n.CreatedAt, &n.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &n, nil
}

func (r *postgresNewsRepository) Create(ctx context.Context, n *entity.News) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO news (judul, slug, konten, imgURL, is_published) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
		n.Judul, n.Slug, n.Konten, n.ImgURL, n.IsPublished,
	).Scan(&id)
	return id, err
}

func (r *postgresNewsRepository) Update(ctx context.Context, n *entity.News) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE news SET judul=$1, slug=$2, konten=$3, imgURL=$4, is_published=$5, updated_at=NOW() WHERE id=$6`,
		n.Judul, n.Slug, n.Konten, n.ImgURL, n.IsPublished, n.ID,
	)
	return err
}

func (r *postgresNewsRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM news WHERE id=$1`, id)
	return err
}
