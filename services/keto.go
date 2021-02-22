package services

import "github.com/ory/keto-client-go/client"

func getClient() *client.OryKeto {
	client := client.NewHTTPClientWithConfig(nil, &client.TransportConfig{
		Host:     "127.0.0.1:4434",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	return client
}

// Keto vvv
var Keto = getClient()
