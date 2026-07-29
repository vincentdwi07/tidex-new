package filestore

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

type FileUploader struct {
	BaseDir string // absolute path to uploads folder
	BaseURL string // e.g. "/uploads"
}

func NewFileUploader(baseDir, baseURL string) *FileUploader {
	return &FileUploader{BaseDir: baseDir, BaseURL: baseURL}
}

// UploadFile saves a multipart file to BaseDir/folder/uuid.ext and returns the public URL path.
func (fu *FileUploader) UploadFile(file multipart.File, header *multipart.FileHeader, folder string) (string, error) {
	ext := strings.ToLower(filepath.Ext(header.Filename))
	if ext == "" {
		ext = ".jpg"
	}

	dir := filepath.Join(fu.BaseDir, folder)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	filename := uuid.New().String() + ext
	destPath := filepath.Join(dir, filename)

	dst, err := os.Create(destPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		return "", fmt.Errorf("failed to save file: %w", err)
	}

	// Return URL path (forward slashes)
	urlPath := fu.BaseURL + "/" + folder + "/" + filename
	return urlPath, nil
}

// DeleteFile removes a file given its URL path (e.g. /uploads/products/uuid.jpg).
func (fu *FileUploader) DeleteFile(urlPath string) error {
	if urlPath == "" {
		return nil
	}
	// Convert URL path to filesystem path
	rel := strings.TrimPrefix(urlPath, fu.BaseURL+"/")
	rel = strings.ReplaceAll(rel, "/", string(os.PathSeparator))
	absPath := filepath.Join(fu.BaseDir, rel)

	if err := os.Remove(absPath); err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("failed to delete file: %w", err)
	}
	return nil
}
