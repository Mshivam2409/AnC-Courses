package services

import (
	"log"
	"net/smtp"

	"github.com/spf13/viper"
)

func SendMail(message string, to string) error {

	msg := "From: " + viper.GetString("mail.from") + "\n" +
		"To: " + to + "\n" +
		"Subject: Account Recovery\n\n" +
		message

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", viper.GetString("mail.id"), viper.GetString("mail.pwd"), "smtp.gmail.com"),
		viper.GetString("mail.from"), []string{to}, []byte(msg))

	if err != nil {
		log.Printf("smtp error: %s", err)
		return err
	}

	return nil
}
