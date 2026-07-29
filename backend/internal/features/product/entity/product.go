package entity

type Product struct {
	ID        int    `json:"id"`
	Kategori  string `json:"kategori"`
	Nama      string `json:"nama"`
	ImgURL    string `json:"imgURL"`
	Deskripsi string `json:"deskripsi"`
	Logos     string `json:"logos"`
}

type ProductPartner struct {
	ProductID int `json:"product_id"`
	PartnerID int `json:"partner_id"`
}
