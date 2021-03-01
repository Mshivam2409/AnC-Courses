package services

import (
	keto "github.com/ory/keto-client-go/client"
	kratos "github.com/ory/kratos-client-go/client"
)

type Ory struct {
	*kratos.OryKratos
	*keto.OryKeto
}

func InitalizeOryServices() *Ory {
	kr := kratos.NewHTTPClientWithConfig(nil, &kratos.TransportConfig{
		Host:     "127.0.0.1:4434",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	kt := keto.NewHTTPClientWithConfig(nil, &keto.TransportConfig{
		Host:     "127.0.0.1:4456",
		BasePath: "/",
		Schemes:  []string{"http"},
	})
	return &Ory{kr, kt}
}

var OryClient = InitalizeOryServices()
