package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/news/entity"
)

type NewsRepository interface {
	FindAll(ctx context.Context, limit, offset int) ([]entity.News, error)
	FindByID(ctx context.Context, id int) (*entity.News, error)
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

func (r *postgresNewsRepository) FindAll(ctx context.Context, limit, offset int) ([]entity.News, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, judul, kategori, news, "imgURL", created_at, updated_at FROM news ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
		limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var newsList []entity.News
	for rows.Next() {
		var n entity.News
		var createdAt sql.NullTime
		if err := rows.Scan(&n.ID, &n.Judul, &n.Kategori, &n.News, &n.ImgURL, &createdAt, &n.UpdatedAt); err != nil {
			return nil, err
		}
		if createdAt.Valid {
			n.CreatedAt = createdAt.Time
		}
		newsList = append(newsList, n)
	}
	return newsList, nil
}

func (r *postgresNewsRepository) FindByID(ctx context.Context, id int) (*entity.News, error) {
	var n entity.News
	var createdAt sql.NullTime
	err := r.db.QueryRowContext(ctx,
		`SELECT id, judul, kategori, news, "imgURL", created_at, updated_at FROM news WHERE id=$1`, id,
	).Scan(&n.ID, &n.Judul, &n.Kategori, &n.News, &n.ImgURL, &createdAt, &n.UpdatedAt)
	if err != nil {
		return nil, err
	}
	if createdAt.Valid {
		n.CreatedAt = createdAt.Time
	}
	return &n, nil
}

func (r *postgresNewsRepository) Create(ctx context.Context, n *entity.News) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO news (judul, kategori, news, "imgURL", created_at) VALUES ($1,$2,$3,$4,NOW()) RETURNING id`,
		n.Judul, n.Kategori, n.News, n.ImgURL,
	).Scan(&id)
	return id, err
}

func (r *postgresNewsRepository) Update(ctx context.Context, n *entity.News) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE news SET judul=$1, kategori=$2, news=$3, "imgURL"=$4, updated_at=NOW() WHERE id=$5`,
		n.Judul, n.Kategori, n.News, n.ImgURL, n.ID,
	)
	return err
}

func (r *postgresNewsRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM news WHERE id=$1`, id)
	return err
}
