package handler

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/news/entity"
	"backend/internal/features/news/service"
	"backend/internal/response"
	"backend/internal/utils/common"
)

type NewsHandler struct {
	service service.NewsService
}

func NewNewsHandler(svc service.NewsService) *NewsHandler {
	return &NewsHandler{service: svc}
}

func (h *NewsHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	p := common.GetPaginationParams(r, 10)
	// Admin sees all; public only published
	publishedOnly := r.URL.Query().Get("published") == "true"
	data, err := h.service.GetAll(r.Context(), p.Limit, p.Offset, publishedOnly)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	next := common.NextPage(p.Page, p.Limit, len(data))
	response.SuccessPaginated(w, http.StatusOK, "OK", data, &response.PaginationMetadata{
		Page:     p.Page,
		Limit:    p.Limit,
		NextPage: next,
	})
}

func (h *NewsHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	data, err := h.service.GetByID(r.Context(), id)
	if err != nil {
		response.Error(w, http.StatusNotFound, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", data)
}

func (h *NewsHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	data, err := h.service.GetBySlug(r.Context(), slug)
	if err != nil {
		response.Error(w, http.StatusNotFound, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", data)
}

func (h *NewsHandler) Create(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}

	isPublished := r.FormValue("is_published") == "true"
	n := entity.News{
		Judul:       r.FormValue("judul"),
		Slug:        r.FormValue("slug"),
		Konten:      r.FormValue("konten"),
		IsPublished: isPublished,
	}

	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Create(r.Context(), &n, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusCreated, "Berita berhasil dibuat", data)
}

func (h *NewsHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}

	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}

	isPublished := r.FormValue("is_published") == "true"
	n := entity.News{
		Judul:       r.FormValue("judul"),
		Slug:        r.FormValue("slug"),
		Konten:      r.FormValue("konten"),
		IsPublished: isPublished,
	}

	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Update(r.Context(), id, &n, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Berita berhasil diperbarui", data)
}

func (h *NewsHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Berita berhasil dihapus", nil)
}
