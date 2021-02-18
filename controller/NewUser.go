package controller

import (
	"fmt"

	"github.com/ory/kratos-client-go/client"
	"github.com/ory/kratos-client-go/client/admin"
	"github.com/ory/kratos-client-go/models"
)

// CreateUser Creates a new user using the Kratos Admin API
// Only Admins should have access to this api
func CreateUser() {
	c := client.NewHTTPClientWithConfig(nil, &client.TransportConfig{
		Host:     "127.0.0.1:4434",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	res, err := c.Admin.CreateRecoveryLink(admin.NewCreateRecoveryLinkParams().WithBody(&models.CreateRecoveryLink{
		IdentityID: models.UUID("the-uuid"),
	}))
	if err != nil {
		// ...
	}

	fmt.Printf("Use link: %s", *res.Payload.RecoveryLink)
}
