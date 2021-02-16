package main

import (
	"github.com/ory/kratos-client-go/client"
	"github.com/ory/kratos-client-go/client/admin"
)

func main() {
	c := client.NewHTTPClientWithConfig(nil, &client.TransportConfig{
		Host:     "127.0.0.1:4434",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	c.Admin.CreateIdentity(&admin.CreateIdentityParams{})
}
