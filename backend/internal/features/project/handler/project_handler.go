package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"backend/internal/features/project/entity"
	"backend/internal/features/project/service"
	"backend/internal/response"
	"backend/internal/utils/common"
)

type ProjectHandler struct {
	service service.ProjectService
}

func NewProjectHandler(svc service.ProjectService) *ProjectHandler {
	return &ProjectHandler{service: svc}
}

func (h *ProjectHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	p := common.GetPaginationParams(r, 12)
	data, err := h.service.GetAll(r.Context(), p.Limit, p.Offset)
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

func (h *ProjectHandler) GetByID(w http.ResponseWriter, r *http.Request) {
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

func (h *ProjectHandler) Create(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		// Fallback: try JSON
		var p entity.Project
		if err2 := json.NewDecoder(r.Body).Decode(&p); err2 != nil {
			response.Error(w, http.StatusBadRequest, "Request tidak valid")
			return
		}
		data, err := h.service.Create(r.Context(), &p, nil, nil)
		if err != nil {
			response.Error(w, http.StatusInternalServerError, err.Error())
			return
		}
		response.Success(w, http.StatusCreated, "Project berhasil dibuat", data)
		return
	}

	p := entity.Project{
		Nama:        r.FormValue("nama"),
		Deskripsi:   r.FormValue("deskripsi"),
		CompanyName: r.FormValue("company_name"),
	}

	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Create(r.Context(), &p, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusCreated, "Project berhasil dibuat", data)
}

func (h *ProjectHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}

	if err := r.ParseMultipartForm(10 << 20); err != nil {
		response.Error(w, http.StatusBadRequest, "Form tidak valid")
		return
	}

	p := entity.Project{
		Nama:        r.FormValue("nama"),
		Deskripsi:   r.FormValue("deskripsi"),
		CompanyName: r.FormValue("company_name"),
	}

	f, fh, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		response.Error(w, http.StatusBadRequest, "Gagal membaca file")
		return
	}
	if f != nil {
		defer f.Close()
	}

	data, err := h.service.Update(r.Context(), id, &p, f, fh)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Project berhasil diperbarui", data)
}

func (h *ProjectHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		response.Error(w, http.StatusBadRequest, "ID tidak valid")
		return
	}
	if err := h.service.Delete(r.Context(), id); err != nil {
		response.Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(w, http.StatusOK, "Project berhasil dihapus", nil)
}
