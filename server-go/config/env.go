package config

import "os"

func SetEnv() {
	os.Setenv("DATABASE_URL", "")
}
