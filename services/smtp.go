package services

import (
	"bytes"
	"log"
	"net"
	"net/mail"
	"net/smtp"

	"github.com/mhale/smtpd"
	"github.com/spf13/viper"
)

func mailHandler(origin net.Addr, from string, to []string, data []byte) error {
	msg, _ := mail.ReadMessage(bytes.NewReader(data))
	subject := msg.Header.Get("Subject")
	log.Printf("Received mail from %s for %s with subject %s", from, to[0], subject)
	SendMail(string(data), to[0])
	return nil
}

// SMTPListenAndServe : Starts the SMTP server
func SMTPListenAndServe() error {
	log.Print("Starting SMTP server at :2525")
	err := smtpd.ListenAndServe("127.0.0.1:2525", mailHandler, "anc-mailer", "localhost")
	if err != nil {
		log.Println(err)
		return err
	}
	return err
}

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
