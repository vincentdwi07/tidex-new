package entity

import "time"

type News struct {
	ID        int        `json:"id"`
	Judul     string     `json:"judul"`
	Kategori  string     `json:"kategori"`
	News      string     `json:"news"`
	ImgURL    string     `json:"imgURL"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}
