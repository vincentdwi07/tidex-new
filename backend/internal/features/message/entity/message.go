package entity

import "time"

type Message struct {
	ID        int        `json:"id"`
	Nama      string     `json:"nama"`
	Email     string     `json:"email"`
	Pesan     string     `json:"pesan"`
	IsNew     bool       `json:"isNew"`
	IPAddress string     `json:"ip_address,omitempty"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}
