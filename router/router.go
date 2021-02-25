package router

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/Mshivam2409/AnC-Courses/controller"
	"github.com/Mshivam2409/AnC-Courses/graphql/generated"
	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp/fasthttpadaptor"
)

// SetupRoutes ....
func SetupRoutes(app *fiber.App) {
	app.All("/graphql", func(ctx *fiber.Ctx) error {
		h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{}))
		fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			h.ServeHTTP(writer, request)
		})(ctx.Context())
		return nil
	})
	restAPI := app.Group("/secure")
	restAPI.Post("/file/create", controller.CreateFile)

}
