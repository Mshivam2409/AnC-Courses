package services

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/ory/kratos-client-go/client/admin"
	kratosmodels "github.com/ory/kratos-client-go/models"
	"github.com/spf13/viper"
)

// CreateUser sdfsd
func (ory *Ory) CreateUser(email string) error {
	schema := viper.GetString("vasd")
	i, err := ory.OryKratos.Admin.CreateIdentity(&admin.CreateIdentityParams{Body: &kratosmodels.CreateIdentity{SchemaID: &schema, Traits: fiber.Map{"email": email}}})
	id := i.GetPayload().ID
	link, err := ory.OryKratos.Admin.CreateRecoveryLink(&admin.CreateRecoveryLinkParams{Body: &kratosmodels.CreateRecoveryLink{IdentityID: id}})
	fmt.Print(link.Payload.RecoveryLink)
	ory.ElevateUser(email, "user")
	return err
}

// DeleteUser : adas
func (ory *Ory) DeleteUser(id string) error {
	_, err := ory.OryKratos.Admin.DeleteIdentity(&admin.DeleteIdentityParams{ID: id})
	return err
}
