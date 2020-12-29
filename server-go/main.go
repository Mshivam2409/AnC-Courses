package main

import (
	"anc-courses/jobs"
	"anc-courses/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	app := fiber.New()
	app.Use(recover.New())
	router.SetupRoutes(app)
	app.Listen(":3000")
	jobs.StartCronJobs()
}
