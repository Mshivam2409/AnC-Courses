package main

import (
	"fmt"

	"github.com/Mshivam2409/AnC-Courses/router"

	"github.com/ansrivas/fiberprometheus/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	// Create a new fiber instance with custom config
	app := fiber.New(fiber.Config{
		// Override default error handler
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			// Statuscode defaults to 500
			code := fiber.StatusInternalServerError
			message := "Internal Server Error"
			// Retreive the custom statuscode if it's an fiber.*Error
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
				message = e.Message
			}

			// Send custom error page
			err = ctx.Status(code).JSON(fiber.Map{"message": message})
			if err != nil {
				// In case the SendFile fails
				return ctx.Status(500).SendString("Internal Server Error")
			}

			// Return from handler
			return nil
		},
	})
	// Setup mgm default config

	// if err != nil {
	// 	log.Fatal("uN")
	// }
	// appf, err := firebase.NewApp(context.Background(), nil)
	// if err != nil {
	// 	log.Fatalf("error initializing app: %v\n", err)
	// }
	// appf.
	app.Use(cors.New(cors.Config{AllowOrigins: "*"}))
	app.Use(recover.New())
	prometheus := fiberprometheus.New("my-service-name")
	prometheus.RegisterAt(app, "/metrics")
	app.Use(prometheus.Middleware)
	// viper.SetConfigName("config")
	// viper.SetConfigType("yaml")
	// clientOptions := options.Client().ApplyURI("mongodb+srv://anc:courses@primary.hsesw.mongodb.net/primarydb?retryWrites=true&w=majority")

	// Connect to MongoDB
	// client, err := mongo.Connect(context.TODO(), clientOptions)

	// if err != nil {
	// 	print(err.Error())
	// }

	// err = client.Ping(context.TODO(), nil)

	// if err != nil {
	// 	print(err.Error())
	// }

	fmt.Println("Connected to MongoDB!")
	router.SetupRoutes(app)
	print(111)
	app.Static("/", "html")
	err := app.Listen(":5000")
	if err != nil {
		fmt.Print(err)
	}
}
