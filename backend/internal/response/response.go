package response

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Success  bool                `json:"success"`
	Message  string              `json:"message"`
	Data     interface{}         `json:"data,omitempty"`
	Metadata *PaginationMetadata `json:"metadata,omitempty"`
	Errors   map[string]string   `json:"errors,omitempty"`
}

type PaginationMetadata struct {
	Page     int  `json:"page"`
	Limit    int  `json:"limit"`
	NextPage *int `json:"nextPage"`
}

func WriteJSON(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

func Success(w http.ResponseWriter, status int, message string, data interface{}) {
	WriteJSON(w, status, APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func SuccessPaginated(w http.ResponseWriter, status int, message string, data interface{}, metadata *PaginationMetadata) {
	WriteJSON(w, status, APIResponse{
		Success:  true,
		Message:  message,
		Data:     data,
		Metadata: metadata,
	})
}

func Error(w http.ResponseWriter, status int, message string) {
	WriteJSON(w, status, APIResponse{
		Success: false,
		Message: message,
	})
}

func ValidationError(w http.ResponseWriter, message string, errors map[string]string) {
	WriteJSON(w, http.StatusUnprocessableEntity, APIResponse{
		Success: false,
		Message: message,
		Errors:  errors,
	})
}
