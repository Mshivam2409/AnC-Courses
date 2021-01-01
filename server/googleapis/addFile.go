package googleapis

import (
	"anc-courses/config"
	"anc-courses/models"
	"log"
	"mime/multipart"

	"google.golang.org/api/drive/v3"
)

func UploadFileToDrive(folderId string, file *multipart.FileHeader) models.File {

	srv, err := drive.New(config.GoogleClient)
	if err != nil {
		log.Fatalf("Unable to retrieve drive Client %v", err)
	}
	f, err := file.Open()
	driveFile, err := srv.Files.Create(&drive.File{Name: "filename"}).Media(f).Do()
	if err != nil {
		log.Fatalf("Unable to create file: %v", err)
	}

	return models.File{ID: driveFile.DriveId, Name: file.Filename}
}
