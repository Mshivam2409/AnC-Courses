package main

import (
	"github.com/Mshivam2409/AnC-Courses/router"

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
	router.SetupRoutes(app)
	app.Listen(":3000")
}
