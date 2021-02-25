//go:generate sh -c "go run gitlab.com/hookactions/gqlgen-relay -pkg models -name User -type *User -cursor > user_relay.go"
package models

type User struct {
	FirstName string
	LastName  string
}
