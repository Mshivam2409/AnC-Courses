package jobs

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

	"github.com/robfig/cron/v3"
	"github.com/spf13/viper"
)

//CheckHealth of Kratos, Database, Oathkeeper and NGINX
func CheckHealth() {
	c := cron.New()
	// ctx := context.Background()

	c.AddFunc("@hourly", func() {
		out, _ := exec.Command("ping", viper.GetString("KRATOS_ADMIN_URL"), "-c 5", "-i 3", "-w 10").Output()
		if strings.Contains(string(out), "Destination Host Unreachable") {
			fmt.Println("KRATOS DOWN")
			os.Exit(1)
		}
	})
}
