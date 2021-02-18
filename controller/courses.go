package controller

import (
	"github.com/Mshivam2409/AnC-Courses/googleapis"
	"github.com/Mshivam2409/AnC-Courses/models"
	"github.com/gofiber/fiber/v2"
)

// CreateCourse badas
func CreateCourse(req *fiber.Ctx) error {
	c := new(models.Course)
	if err := req.BodyParser(c); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, "Unprocessable Data")
	}
	f := googleapis.CreateFolder(googleapis.DriveService, c.Number)
	c.DriveFolder = f
	return req.Status(fiber.StatusAccepted).JSON(fiber.Map{"message": "success"})
}
