package main

import (
	"anc-courses/config"
	"anc-courses/jobs"
	"anc-courses/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	config.SetEnv()
	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New())
	router.SetupRoutes(app)
	app.Listen(":3000")
	jobs.StartCronJobs()
}
