package services

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/spf13/viper"
)

func CommentoLogin(c *fiber.Ctx) error {
	token := c.Query("token")
	commentoKey := viper.GetString("c")
	// hmac, err := hex.DecodeString(c.Query("hmac"))
	// if err != nil {
	// 	return c.Status(fiber.StatusExpectationFailed).JSON(fiber.Map{})
	// }
	auth, err := jwt.Parse(c.Get("Authorization"), nil)

	if err != nil {
		return c.Status(fiber.StatusExpectationFailed).JSON(fiber.Map{})
	}

	if claims, ok := auth.Claims.(jwt.MapClaims); ok && auth.Valid {
		payload := fiber.Map{
			"token": token,
			"email": claims["asda"],
			"name":  "name",
		}
		jsonPayload, _ := json.Marshal(payload)
		h := hmac.New(sha256.New, []byte(commentoKey))
		h.Write(jsonPayload)

		encodedPayload := hex.EncodeToString(h.Sum(nil))
		bytedPayload := hex.EncodeToString(jsonPayload)
		return c.Redirect("https://commento.io/api/oauth/sso/callback?payload=" + bytedPayload + "&hmac=" + encodedPayload)
	} else {

		return c.Status(fiber.StatusExpectationFailed).JSON(fiber.Map{})
	}
}
