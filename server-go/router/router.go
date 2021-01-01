package router

import (
	"anc-courses/controller"

	"github.com/gofiber/fiber/v2"
)

// SetupRoutes Sets up routes
func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/signin", controller.UserSigninHandler)
	api.Post("/addCourse", controller.AddCourseHandler)
	api.Post("/addFile", controller.AddFile)
}
