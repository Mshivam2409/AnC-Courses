package controller

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

type adminLoginData struct {
	Username string `json:"userName"`
	Password string `json:"password"`
}

func AdminSignInHandler(c *fiber.Ctx) error {
	body := new(userLoginData)
	if err := c.BodyParser(body); err != nil {
		fmt.Println(err)
		return err
	}
	return c.Status(200).SendStatus(200)
}
