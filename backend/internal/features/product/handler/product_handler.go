package handler

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/product/dto"
	"backend/internal/features/product/service"
	"backend/internal/response"
	"backend/internal/validator"
)

type ProductHandler struct {
	service   service.ProductService
	validator *validator.Validator
}

func NewProductHandler(svc service.ProductService, v *validator.Validator) *ProductHandler {
	return &ProductHandler{service: svc, validator: v}
}

func (h *ProductHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	search := r.URL.Query().Get("search")
	data, err := h.service.GetAll(r.Context(), search)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", data)
}

func (h *ProductHandler) GetByID(w http.ResponseWriter, r *http.Request) {
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

func (h *ProductHandler) Create(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}

	req := dto.CreateProductRequest{
		Kategori:   r.FormValue("kategori"),
		Nama:       r.FormValue("nama"),
		Deskripsi:  r.FormValue("deskripsi"),
		Logos:      r.FormValue("logos"),
		PartnerIDs: service.ParsePartnerIDs(r.Form["partner_ids"]),
	}

	if errs := h.validator.Validate(req); errs != nil {
		response.ValidationError(w, "Validasi gagal", errs)
		return
	}

	var file interface{ Read([]byte) (int, error) }
	_ = file
	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Create(r.Context(), &req, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusCreated, "Produk berhasil dibuat", data)
}

func (h *ProductHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}

	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}

	req := dto.UpdateProductRequest{
		Kategori:   r.FormValue("kategori"),
		Nama:       r.FormValue("nama"),
		Deskripsi:  r.FormValue("deskripsi"),
		Logos:      r.FormValue("logos"),
		PartnerIDs: service.ParsePartnerIDs(r.Form["partner_ids"]),
	}

	if errs := h.validator.Validate(req); errs != nil {
		response.ValidationError(w, "Validasi gagal", errs)
		return
	}

	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Update(r.Context(), id, &req, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Produk berhasil diperbarui", data)
}

func (h *ProductHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Produk berhasil dihapus", nil)
}
