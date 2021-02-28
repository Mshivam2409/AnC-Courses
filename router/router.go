package router

import (
	// handler "github.com/arsmn/gqlgen/graphql/handler"

	// "github.com/99designs/gqlgen/example/federation/reviews/graph"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/Mshivam2409/AnC-Courses/controller"
	"github.com/Mshivam2409/AnC-Courses/graph"
	"github.com/Mshivam2409/AnC-Courses/graph/generated"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes ....
func SetupRoutes(app *fiber.App) {
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	gqlHandler := srv.Handler()
	app.All("/graphql", func(c *fiber.Ctx) error {
		a := c.Get("Authorizaton")
		c.Locals("Authorizaton", a)
		gqlHandler(c.Context())
		return nil
	})
	restAPI := app.Group("/secure")
	restAPI.Post("/file/create", controller.CreateFile)

}
