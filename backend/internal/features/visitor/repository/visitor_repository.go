package repository

import (
	"context"
	"database/sql"

	"backend/internal/features/visitor/entity"
)

type VisitorRepository interface {
	Track(ctx context.Context, ip string) error
	GetDailyStats(ctx context.Context, days int) ([]entity.VisitorStat, error)
}

type postgresVisitorRepository struct {
	db *sql.DB
}

func NewVisitorRepository(db *sql.DB) VisitorRepository {
	return &postgresVisitorRepository{db: db}
}

// Track inserts a new visitor record (one record per visit, duplicates allowed per day).
// We only deduplicate per IP per day — if same IP visits again on the same day, skip insert.
func (r *postgresVisitorRepository) Track(ctx context.Context, ip string) error {
	_, err := r.db.ExecContext(ctx, `
		INSERT INTO visitors (ip_address, created_at)
		SELECT $1::varchar, NOW()
		WHERE NOT EXISTS (
			SELECT 1 FROM visitors
			WHERE ip_address = $1::varchar
			AND created_at >= CURRENT_DATE
			AND created_at < CURRENT_DATE + INTERVAL '1 day'
		)
	`, ip)
	return err
}

// GetDailyStats returns unique visitor count per day for the last N days.
func (r *postgresVisitorRepository) GetDailyStats(ctx context.Context, days int) ([]entity.VisitorStat, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT
			TO_CHAR(d.day, 'YYYY-MM-DD') AS date,
			COUNT(DISTINCT v.ip_address) AS count
		FROM generate_series(
			CURRENT_DATE - INTERVAL '1 day' * ($1::int - 1),
			CURRENT_DATE,
			'1 day'::INTERVAL
		) AS d(day)
		LEFT JOIN visitors v
			ON DATE(v.created_at) = d.day::date
		GROUP BY d.day
		ORDER BY d.day ASC
	`, days)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stats []entity.VisitorStat
	for rows.Next() {
		var s entity.VisitorStat
		if err := rows.Scan(&s.Date, &s.Count); err != nil {
			return nil, err
		}
		stats = append(stats, s)
	}
	return stats, nil
}
