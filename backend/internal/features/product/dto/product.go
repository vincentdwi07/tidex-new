package dto

type PartnerInfo struct {
	ID     int    `json:"id"`
	Nama   string `json:"nama"`
	ImgURL string `json:"imgURL"`
}

type ProductResponse struct {
	ID        int           `json:"id"`
	Kategori  string        `json:"kategori"`
	Nama      string        `json:"nama"`
	ImgURL    string        `json:"imgURL"`
	Deskripsi string        `json:"deskripsi"`
	Logos     string        `json:"logos"`
	Partners  []PartnerInfo `json:"partners"`
}

type CreateProductRequest struct {
	Kategori   string `form:"kategori" validate:"required"`
	Nama       string `form:"nama" validate:"required"`
	Deskripsi  string `form:"deskripsi" validate:"required"`
	Logos      string `form:"logos"`
	PartnerIDs []int  `form:"partner_ids"`
}

type UpdateProductRequest struct {
	Kategori   string `form:"kategori" validate:"required"`
	Nama       string `form:"nama" validate:"required"`
	Deskripsi  string `form:"deskripsi" validate:"required"`
	Logos      string `form:"logos"`
	PartnerIDs []int  `form:"partner_ids"`
}
