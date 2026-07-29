package common

import (
	"net/http"
	"strconv"
)

type PaginationParams struct {
	Page   int
	Limit  int
	Offset int
}

func GetPaginationParams(r *http.Request, defaultLimit int) PaginationParams {
	page := 1
	limit := defaultLimit
	if defaultLimit <= 0 {
		limit = 10
	}

	if p := r.URL.Query().Get("page"); p != "" {
		if n, err := strconv.Atoi(p); err == nil && n > 0 {
			page = n
		}
	}
	if l := r.URL.Query().Get("limit"); l != "" {
		if n, err := strconv.Atoi(l); err == nil && n > 0 {
			limit = n
		}
	}

	return PaginationParams{
		Page:   page,
		Limit:  limit,
		Offset: (page - 1) * limit,
	}
}

// NextPage returns nil if there are no more pages.
func NextPage(page, limit, totalReturned int) *int {
	if totalReturned < limit {
		return nil
	}
	next := page + 1
	return &next
}
