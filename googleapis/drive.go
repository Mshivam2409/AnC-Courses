package googleapis

import (
	"log"
	"mime/multipart"

	"github.com/Mshivam2409/AnC-Courses/models"
	"google.golang.org/api/drive/v3"
)

// CreateFile Creates a file in google drive and return the file id and filename
func CreateFile(srv *drive.Service, folderID string, file *multipart.FileHeader) models.File {
	f, err := file.Open()
	if err != nil {
		log.Fatalf("Unable to read file: %v", err)
	}
	driveFile, err := srv.Files.Create(&drive.File{Name: file.Filename, Parents: []string{folderID}}).Media(f).Do()
	if err != nil {
		log.Fatalf("Unable to create file: %v", err)
	}
	return models.File{ID: driveFile.DriveId, Name: file.Filename}
}
