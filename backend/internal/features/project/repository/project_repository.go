package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/project/entity"
)

type ProjectRepository interface {
	FindAll(ctx context.Context, limit, offset int) ([]entity.Project, error)
	FindByID(ctx context.Context, id int) (*entity.Project, error)
	Create(ctx context.Context, p *entity.Project) (int, error)
	Update(ctx context.Context, p *entity.Project) error
	Delete(ctx context.Context, id int) error
}

type postgresProjectRepository struct {
	db *sql.DB
}

func NewProjectRepository(db *sql.DB) ProjectRepository {
	return &postgresProjectRepository{db: db}
}

func (r *postgresProjectRepository) FindAll(ctx context.Context, limit, offset int) ([]entity.Project, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, nama, "imgURL" FROM our_project ORDER BY id ASC LIMIT $1 OFFSET $2`,
		limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []entity.Project
	for rows.Next() {
		var p entity.Project
		if err := rows.Scan(&p.ID, &p.Nama, &p.ImgURL); err != nil {
			return nil, err
		}
		projects = append(projects, p)
	}
	return projects, nil
}

func (r *postgresProjectRepository) FindByID(ctx context.Context, id int) (*entity.Project, error) {
	var p entity.Project
	err := r.db.QueryRowContext(ctx,
		`SELECT id, nama, "imgURL" FROM our_project WHERE id=$1`, id,
	).Scan(&p.ID, &p.Nama, &p.ImgURL)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *postgresProjectRepository) Create(ctx context.Context, p *entity.Project) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO our_project (nama, "imgURL") VALUES ($1,$2) RETURNING id`,
		p.Nama, p.ImgURL,
	).Scan(&id)
	return id, err
}

func (r *postgresProjectRepository) Update(ctx context.Context, p *entity.Project) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE our_project SET nama=$1, "imgURL"=$2 WHERE id=$3`,
		p.Nama, p.ImgURL, p.ID,
	)
	return err
}

func (r *postgresProjectRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM our_project WHERE id=$1`, id)
	return err
}
