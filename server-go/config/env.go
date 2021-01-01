package config

import "os"

func SetEnv() {
	os.Setenv("DATABASE_URL", "")
	os.Setenv("MONGO_URL", "mongodb+srv://mshivam:lovelydidi@sd-320808.seh9w.mongodb.net/places?retryWrites=true&w=majority")
}
