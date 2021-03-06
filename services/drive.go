package services

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/Mshivam2409/AnC-Courses/database"
	"github.com/Mshivam2409/AnC-Courses/googleapis"
	"github.com/Mshivam2409/AnC-Courses/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

// CreateFile sdfs
func CreateFile(c *fiber.Ctx) error {
	d := googleapis.GetService()
	n, err := strconv.Atoi(c.FormValue("length"))
	cno := c.FormValue("course")
	if err != nil {
		return &fiber.Error{Code: 422, Message: "Length of files must be a number"}
	}
	files := []string{}
	for i := 0; i < n; i++ {
		f, err := c.FormFile("file" + fmt.Sprint(n))
		if err != nil {
			return &fiber.Error{Code: 422, Message: "Unable to process file!"}
		}
		r, err := d.CreateFile("", f)
		if err != nil {
			return &fiber.Error{Code: 422, Message: "Unable to upload file!"}
		}
		out, err := json.Marshal(r)
		if err != nil {
			return &fiber.Error{Code: 422, Message: "Unable to get file ID!"}
		}
		files = append(files, string(out))
	}
	update := bson.D{
		{Key: "$push", Value: bson.D{
			{Key: "driveFiles", Value: bson.A{"$each", files}},
		}},
	}
	err = database.MongoClient.Collection("courses").FindOneAndUpdate(context.TODO(), bson.D{{Key: "number", Value: cno}}, update).Decode(&models.MGMCourse{})
	return c.Status(200).JSON(fiber.Map{"message": "success"})
}
