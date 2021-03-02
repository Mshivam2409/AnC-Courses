package googleapis

import (
	"log"
	"mime/multipart"

	"github.com/Mshivam2409/AnC-Courses/models"
	"google.golang.org/api/drive/v3"
)

// DriveClient hg
type DriveClient struct {
	*drive.Service
}

// CreateFile Creates a file in google drive and return the file id and filename
func (srv *DriveClient) CreateFile(folderID string, file *multipart.FileHeader) (models.File, error) {
	f, err := file.Open()
	if err != nil {
		log.Printf("Unable to upload file! %v", err)
		return models.File{}, err
	}
	driveFile, err := srv.Files.Create(&drive.File{Name: file.Filename, Parents: []string{folderID}}).Media(f).Do()
	if err != nil {
		log.Printf("Unable to upload file! %v", err)
		return models.File{}, err
	}
	return models.File{ID: driveFile.DriveId, Name: file.Filename}, err
}

// CreateFolder Creates a folder in google drive
func (srv *DriveClient) CreateFolder(folderName string) (string, error) {
	folder, err := srv.Files.Create(&drive.File{MimeType: "application/vnd.google-apps.folder", Name: folderName}).Do()
	log.Printf("Folder with id %v created", folder.Id)
	if err != nil {
		log.Printf("Unable to create folder: %v", err)
	}
	return folder.Id, err
}

// DeleteFile deletes
func (srv *DriveClient) DeleteFile(fileID string) error {
	err := srv.Files.Delete(fileID).Do()
	if err != nil {
		log.Printf("Unable to delete file! : %v"+"File ID:"+fileID, err)
	}
	return err
}
