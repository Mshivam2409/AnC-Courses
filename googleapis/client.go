package googleapis

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
)

// Retrieve a token, saves the token, then returns the generated client.
func getClient(config *oauth2.Config) *http.Client {
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	tokFile := ".secrets/token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		log.Panic("Unable to to parse Json file")
	}
	oldToken, err := json.Marshal(fiber.Map{"client_id": config.ClientID, "client_secret": config.ClientSecret, "refresh_token": tok.RefreshToken, "grant_type": "refresh_token"})
	if err != nil {
		log.Panic("Unable to to parse Json file")
	}
	r, err := http.Post("https://accounts.google.com/o/oauth2/token", "application/json", bytes.NewBuffer(oldToken))
	if err != nil {
		log.Panic("Unable to to parse Json file")
	}
	newToken := &oauth2.Token{}
	defer r.Body.Close()
	json.NewDecoder(r.Body).Decode(newToken)
	return config.Client(context.Background(), newToken)
}

// Retrieves a token from a local file.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

func GetService() *drive.Service {
	b, err := ioutil.ReadFile(".secrets/credentials.json")
	if err != nil {
		log.Fatalf("Unable to read client secret file: %v", err)
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, drive.DriveMetadataReadonlyScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)
	srv, err := drive.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Drive client: %v", err)
	}
	return srv
}
