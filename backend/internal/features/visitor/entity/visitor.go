package entity

import "time"

type Visitor struct {
	ID        int        `json:"id"`
	IPAddress string     `json:"ip_address"`
	CreatedAt *time.Time `json:"created_at"`
}

type VisitorStat struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
}
