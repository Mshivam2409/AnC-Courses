package main

import (
	"fmt"
	"log"

	"github.com/Mshivam2409/AnC-Courses/api"
	"github.com/Mshivam2409/AnC-Courses/database"
	"github.com/Mshivam2409/AnC-Courses/services"
	"github.com/spf13/viper"

	"github.com/ansrivas/fiberprometheus/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func init() {
	viper.AddConfigPath(".")
	viper.AddConfigPath("/etc/config/fiber/")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	if err != nil {
		log.Panicf("Fatal error config file: %s", err)
	}
	database.ConnectMongo()
	services.InitalizeOryServices()
}

func main() {
	print(9)
	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			message := "Internal Server Error"
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				message = e.Message
			}
			err = ctx.Status(code).JSON(fiber.Map{"message": message})
			if err != nil {
				return ctx.Status(500).SendString("Internal Server Error")
			}
			return nil
		},
	})
	app.Use(cors.New(cors.Config{AllowOrigins: "*"}))
	app.Use(recover.New())
	prometheus := fiberprometheus.New("fiber")
	prometheus.RegisterAt(app, "/metrics")
	app.Use(prometheus.Middleware)
	api.SetupRoutes(app)
	app.Static("/", "html")
	err := app.Listen(":5000")
	if err != nil {
		fmt.Print(err)
	}
}
