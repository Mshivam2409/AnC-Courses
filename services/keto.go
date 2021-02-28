package services

import (
	"fmt"

	"github.com/ory/keto-client-go/client"
	"github.com/ory/keto-client-go/client/engines"
	"github.com/ory/keto-client-go/models"
	"gopkg.in/square/go-jose.v2/jwt"
)

func getClient() *client.OryKeto {
	client := client.NewHTTPClientWithConfig(nil, &client.TransportConfig{
		Host:     "127.0.0.1:4456",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	return client
}

var ketoClient = getClient()

// IsAuthorized chec
func IsAuthorized(tokenString string, action string, resource string) (bool, error) {
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
	r, err := ketoClient.Engines.DoOryAccessControlPoliciesAllow(&engines.DoOryAccessControlPoliciesAllowParams{Body: &models.OryAccessControlPolicyAllowedInput{
		Action:   action,
		Subject:  fmt.Sprintf("%v", claims["subject"]),
		Resource: resource,
	}, Flavor: "exact"})
	if err != nil {
		return false, err
	}
	return *r.Payload.Allowed, err
}
