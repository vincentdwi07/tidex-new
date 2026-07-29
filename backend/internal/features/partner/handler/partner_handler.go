package handler

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/partner/service"
	"backend/internal/response"
)

type PartnerHandler struct {
	service service.PartnerService
}

func NewPartnerHandler(svc service.PartnerService) *PartnerHandler {
	return &PartnerHandler{service: svc}
}

func (h *PartnerHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	data, err := h.service.GetAll(r.Context())
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "OK", data)
}

func (h *PartnerHandler) GetByID(w http.ResponseWriter, r *http.Request) {
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

func (h *PartnerHandler) Create(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}
	nama := r.FormValue("nama")
	if nama == "" {
		response.Error(w, http.StatusBadRequest, "Nama wajib diisi")
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
	data, err := h.service.Create(r.Context(), nama, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusCreated, "Partner berhasil dibuat", data)
}

func (h *PartnerHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}
	nama := r.FormValue("nama")
	if nama == "" {
		response.Error(w, http.StatusBadRequest, "Nama wajib diisi")
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
	data, err := h.service.Update(r.Context(), id, nama, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Partner berhasil diperbarui", data)
}

func (h *PartnerHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Partner berhasil dihapus", nil)
}
