package main

import (
	"net/http"

	"github.com/Mshivam2409/AnC-Courses/graph/generated"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/ansrivas/fiberprometheus/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/spf13/viper"
	"github.com/valyala/fasthttp/fasthttpadaptor"
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
	app.Post("/query", func(ctx *fiber.Ctx) error {
		h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{}))
		fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
			h.ServeHTTP(writer, request)
		})(ctx.Context())
		return nil
	})
	app.Listen(":3000")
}
