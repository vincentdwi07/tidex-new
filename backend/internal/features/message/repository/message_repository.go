package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/message/entity"
)

type MessageRepository interface {
	FindAll(ctx context.Context, limit, offset int) ([]entity.Message, error)
	FindByID(ctx context.Context, id int) (*entity.Message, error)
	Create(ctx context.Context, m *entity.Message) (int, error)
	MarkAsRead(ctx context.Context, id int) error
	Delete(ctx context.Context, id int) error
}

type postgresMessageRepository struct {
	db *sql.DB
}

func NewMessageRepository(db *sql.DB) MessageRepository {
	return &postgresMessageRepository{db: db}
}

func (r *postgresMessageRepository) FindAll(ctx context.Context, limit, offset int) ([]entity.Message, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, name, email, phone, company, message, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
		limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var msgs []entity.Message
	for rows.Next() {
		var m entity.Message
		if err := rows.Scan(&m.ID, &m.Name, &m.Email, &m.Phone, &m.Company, &m.Message, &m.IsRead, &m.CreatedAt); err != nil {
			return nil, err
		}
		msgs = append(msgs, m)
	}
	return msgs, nil
}

func (r *postgresMessageRepository) FindByID(ctx context.Context, id int) (*entity.Message, error) {
	var m entity.Message
	err := r.db.QueryRowContext(ctx,
		`SELECT id, name, email, phone, company, message, is_read, created_at FROM messages WHERE id=$1`, id,
	).Scan(&m.ID, &m.Name, &m.Email, &m.Phone, &m.Company, &m.Message, &m.IsRead, &m.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &m, nil
}

func (r *postgresMessageRepository) Create(ctx context.Context, m *entity.Message) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO messages (name, email, phone, company, message) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
		m.Name, m.Email, m.Phone, m.Company, m.Message,
	).Scan(&id)
	return id, err
}

func (r *postgresMessageRepository) MarkAsRead(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `UPDATE messages SET is_read=true WHERE id=$1`, id)
	return err
}

func (r *postgresMessageRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM messages WHERE id=$1`, id)
	return err
}
