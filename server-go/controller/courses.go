package controller

import (
	"anc-courses/database"
	"anc-courses/googleapis"
	"anc-courses/models"
	"context"
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddCourseHandler(c *fiber.Ctx) error {
	course := models.Course{}
	err := json.Unmarshal([]byte(c.FormValue("courseDetails")), &course)
	if err != nil {
		panic(err)
	}
	course.DriveFiles = make([]string, 0)
	course.Reviews = make([]primitive.ObjectID, 0)
	collection := database.MongoDB.Collection("courses")
	_, err = collection.InsertOne(context.TODO(), course)
	if err != nil {
		panic(err)
	}
	return c.Status(201).JSON(map[string]interface{}{"message": "success"})
}

func AddFile(c *fiber.Ctx) error {
	file, err := c.FormFile("file1")
	if err != nil {
		panic(err)
	}
	googleapis.UploadFileToDrive("dfsd", file)
	return c.Status(201).JSON("")
}
