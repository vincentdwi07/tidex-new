package repository

import (
	"context"
	"database/sql"
	"fmt"

	"backend/internal/features/product/dto"
	"backend/internal/features/product/entity"
)

type ProductRepository interface {
	FindAll(ctx context.Context, search string) ([]dto.ProductResponse, error)
	FindByID(ctx context.Context, id int) (*dto.ProductResponse, error)
	Create(ctx context.Context, p *entity.Product) (int, error)
	Update(ctx context.Context, p *entity.Product) error
	Delete(ctx context.Context, id int) error
	SyncPartners(ctx context.Context, productID int, partnerIDs []int) error
}

type postgresProductRepository struct {
	db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
	return &postgresProductRepository{db: db}
}

func (r *postgresProductRepository) FindAll(ctx context.Context, search string) ([]dto.ProductResponse, error) {
	query := `
		SELECT p.id, p.kategori, p.nama, p."imgURL", p.deskripsi, p.logos,
		       pt.id, pt.nama, pt."imgURL"
		FROM our_product p
		LEFT JOIN our_product_partner pp ON pp.product_id = p.id
		LEFT JOIN our_partner pt ON pt.id = pp.partner_id`

	args := []interface{}{}
	if search != "" {
		query += ` WHERE p.nama ILIKE $1 OR p.kategori ILIKE $1`
		args = append(args, "%"+search+"%")
	}
	query += ` ORDER BY p.id ASC`

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	productMap := map[int]*dto.ProductResponse{}
	order := []int{}

	for rows.Next() {
		var p dto.ProductResponse
		var partnerID sql.NullInt64
		var partnerNama, partnerImg sql.NullString

		err := rows.Scan(&p.ID, &p.Kategori, &p.Nama, &p.ImgURL, &p.Deskripsi, &p.Logos,
			&partnerID, &partnerNama, &partnerImg)
		if err != nil {
			return nil, err
		}

		if _, exists := productMap[p.ID]; !exists {
			p.Partners = []dto.PartnerInfo{}
			productMap[p.ID] = &p
			order = append(order, p.ID)
		}

		if partnerID.Valid {
			productMap[p.ID].Partners = append(productMap[p.ID].Partners, dto.PartnerInfo{
				ID:     int(partnerID.Int64),
				Nama:   partnerNama.String,
				ImgURL: partnerImg.String,
			})
		}
	}

	result := make([]dto.ProductResponse, 0, len(order))
	for _, id := range order {
		result = append(result, *productMap[id])
	}
	return result, nil
}

func (r *postgresProductRepository) FindByID(ctx context.Context, id int) (*dto.ProductResponse, error) {
	query := `
		SELECT p.id, p.kategori, p.nama, p."imgURL", p.deskripsi, p.logos,
		       pt.id, pt.nama, pt."imgURL"
		FROM our_product p
		LEFT JOIN our_product_partner pp ON pp.product_id = p.id
		LEFT JOIN our_partner pt ON pt.id = pp.partner_id
		WHERE p.id = $1`

	rows, err := r.db.QueryContext(ctx, query, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var product *dto.ProductResponse
	for rows.Next() {
		var p dto.ProductResponse
		var partnerID sql.NullInt64
		var partnerNama, partnerImg sql.NullString

		err := rows.Scan(&p.ID, &p.Kategori, &p.Nama, &p.ImgURL, &p.Deskripsi, &p.Logos,
			&partnerID, &partnerNama, &partnerImg)
		if err != nil {
			return nil, err
		}

		if product == nil {
			p.Partners = []dto.PartnerInfo{}
			product = &p
		}

		if partnerID.Valid {
			product.Partners = append(product.Partners, dto.PartnerInfo{
				ID:     int(partnerID.Int64),
				Nama:   partnerNama.String,
				ImgURL: partnerImg.String,
			})
		}
	}

	if product == nil {
		return nil, sql.ErrNoRows
	}
	return product, nil
}

func (r *postgresProductRepository) Create(ctx context.Context, p *entity.Product) (int, error) {
	var id int
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO our_product (kategori, nama, "imgURL", deskripsi, logos) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
		p.Kategori, p.Nama, p.ImgURL, p.Deskripsi, p.Logos,
	).Scan(&id)
	return id, err
}

func (r *postgresProductRepository) Update(ctx context.Context, p *entity.Product) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE our_product SET kategori=$1, nama=$2, "imgURL"=$3, deskripsi=$4, logos=$5 WHERE id=$6`,
		p.Kategori, p.Nama, p.ImgURL, p.Deskripsi, p.Logos, p.ID,
	)
	return err
}

func (r *postgresProductRepository) Delete(ctx context.Context, id int) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM our_product WHERE id=$1`, id)
	return err
}

func (r *postgresProductRepository) SyncPartners(ctx context.Context, productID int, partnerIDs []int) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx, `DELETE FROM our_product_partner WHERE product_id=$1`, productID)
	if err != nil {
		return err
	}

	for _, pid := range partnerIDs {
		_, err = tx.ExecContext(ctx,
			`INSERT INTO our_product_partner (product_id, partner_id) VALUES ($1,$2)`,
			productID, pid,
		)
		if err != nil {
			return fmt.Errorf("failed to insert partner %d: %w", pid, err)
		}
	}

	return tx.Commit()
}
