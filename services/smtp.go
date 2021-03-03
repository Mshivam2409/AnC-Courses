package services

import (
	"bytes"
	"log"
	"net"
	"net/mail"

	"github.com/mhale/smtpd"
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
