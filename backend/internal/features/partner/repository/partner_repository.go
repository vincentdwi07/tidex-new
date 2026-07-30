package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/partner/entity"
)

type PartnerRepository interface {
	FindAll(ctx context.Context) ([]entity.Partner, error)
	FindByID(ctx context.Context, id int) (*entity.Partner, error)
	Create(ctx context.Context, p *entity.Partner) (int, error)
	Update(ctx context.Context, p *entity.Partner) error
	Delete(ctx context.Context, id int) error
}

type postgresPartnerRepository struct {
	db *sql.DB
}

func NewPartnerRepository(db *sql.DB) PartnerRepository {
	return &postgresPartnerRepository{db: db}
}

func (r *postgresPartnerRepository) FindAll(ctx context.Context) ([]entity.Partner, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, nama, "imgURL" FROM our_partner ORDER BY id ASC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var partners []entity.Partner
	for rows.Next() {
		var p entity.Partner
		if err := rows.Scan(&p.ID, &p.Nama, &p.ImgURL); err != nil {
			return nil, err
		}
		partners = append(partners, p)
	}
	return partners, nil
}

func (r *postgresPartnerRepository) FindByID(ctx context.Context, id int) (*entity.Partner, error) {
	var p entity.Partner
	err := r.db.QueryRowContext(ctx, `SELECT id, nama, "imgURL" FROM our_partner WHERE id=$1`, id).
		Scan(&p.ID, &p.Nama, &p.ImgURL)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *postgresPartnerRepository) Create(ctx context.Context, p *entity.Partner) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO our_partner (nama, "imgURL") VALUES ($1,$2) RETURNING id`,
		p.Nama, p.ImgURL,
	).Scan(&id)
	return id, err
}

func (r *postgresPartnerRepository) Update(ctx context.Context, p *entity.Partner) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE our_partner SET nama=$1, "imgURL"=$2 WHERE id=$3`,
		p.Nama, p.ImgURL, p.ID,
	)
	return err
}

func (r *postgresPartnerRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM our_partner WHERE id=$1`, id)
	return err
}
