package entity

import "time"

type News struct {
	ID          int        `json:"id"`
	Judul       string     `json:"judul"`
	Slug        string     `json:"slug"`
	Konten      string     `json:"konten"`
	ImgURL      string     `json:"imgURL"`
	IsPublished bool       `json:"is_published"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   *time.Time `json:"updated_at"`
}
