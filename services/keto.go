package services

import (
	"fmt"

	"github.com/ory/keto-client-go/client/engines"
	"github.com/ory/keto-client-go/models"
	"github.com/spf13/viper"
	"gopkg.in/square/go-jose.v2/jwt"
)

// IsAuthorized chec
func (ory *Ory) IsAuthorized(tokenString string, action string, resource string) (bool, error) {
	var claims map[string]interface{} // generic map to store parsed token
	// decode JWT token without verifying the signature
	token, err := jwt.ParseSigned(tokenString)
	if err != nil {
		return false, err
	}
	err = token.UnsafeClaimsWithoutVerification(&claims)
	if err != nil {
		return false, err
	}
	r, err := ory.OryKeto.Engines.DoOryAccessControlPoliciesAllow(&engines.DoOryAccessControlPoliciesAllowParams{Body: &models.OryAccessControlPolicyAllowedInput{
		Action:   action,
		Subject:  fmt.Sprintf("%v", claims["subject"]),
		Resource: resource,
	}, Flavor: "exact"})
	if err != nil {
		return false, err
	}
	return *r.Payload.Allowed, err
}

func (ory *Ory) ElevateUser(email string, role string) error {
	_, err := ory.OryKeto.Engines.AddOryAccessControlPolicyRoleMembers(&engines.AddOryAccessControlPolicyRoleMembersParams{Body: &models.AddOryAccessControlPolicyRoleMembersBody{Members: []string{email}}, Flavor: "exact", ID: viper.GetString("sdf")})
	return err
}

func (ory *Ory) DelegateUser(email string, role string) error {
	_, err := ory.OryKeto.Engines.RemoveOryAccessControlPolicyRoleMembers(&engines.RemoveOryAccessControlPolicyRoleMembersParams{Member: email, Flavor: "exact", ID: viper.GetString("sdf")})
	return err
}
