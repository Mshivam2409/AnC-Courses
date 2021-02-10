package main

import (
	"anc/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/ansrivas/fiberprometheus/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/spf13/viper"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	prometheus := fiberprometheus.New("my-service-name")
	prometheus.RegisterAt(app, "/metrics")
	app.Use(prometheus.Middleware)
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(gql.NewResolver()))
	gqlHandler := srv.Handler()
	playground := playground.Handler("GraphQL playground", "/query")

	app.All("/query", func(c *fiber.Ctx) error {
		gqlHandler(c.Context())
		return nil
	})

	app.All("/playground", func(c *fiber.Ctx) error {
		playground(c.Context())
		return nil
	})
	app.Listen(":3000")
}
