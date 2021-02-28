package googleapis

import (
	"mime/multipart"

	"github.com/Mshivam2409/AnC-Courses/models"
	"google.golang.org/api/drive/v3"
)

// CreateFile Creates a file in google drive and return the file id and filename
func CreateFile(srv *drive.Service, folderID string, file *multipart.FileHeader) (models.File, error) {
	f, err := file.Open()
	if err != nil {
		return models.File{}, err
	}
	driveFile, err := srv.Files.Create(&drive.File{Name: file.Filename}).Media(f).Do()
	if err != nil {
		return models.File{}, err
	}
	return models.File{ID: driveFile.DriveId, Name: file.Filename}, err
}

// CreateFolder Creates a folder in google drive
func CreateFolder(srv *drive.Service, folderName string) string {
	folder, err := srv.Files.Create(&drive.File{MimeType: "application/vnd.google-apps.folder", Name: folderName}).Do()
	if err != nil {
		panic("Unable to create folder: %v")
	}
	return folder.DriveId
}

// DeleteFile deletes
func DeleteFile(srv *drive.Service, fileID string) {
	err := srv.Files.Delete(fileID).Do()
	if err != nil {
		panic("Unable to delete file!")
	}
}
