package controller

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type userLoginData struct {
	Username string `json:"userName"`
	Password string `json:"password"`
}

// UserSigninHandler Handles User Login and Logout
var UserSigninHandler = func(c *fiber.Ctx) error {
	body := new(userLoginData)
	if err := c.BodyParser(body); err != nil {
		fmt.Println(err)
		return err
	}
	fmt.Println(body.Password)
	return c.Status(200).JSON(map[string]interface{}{"message": "success"})
}
