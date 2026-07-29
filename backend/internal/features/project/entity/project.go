package entity

import "time"

type Project struct {
	ID          int        `json:"id"`
	Nama        string     `json:"nama"`
	Deskripsi   string     `json:"deskripsi"`
	ImgURL      string     `json:"imgURL"`
	CompanyName string     `json:"company_name"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   *time.Time `json:"updated_at"`
}
