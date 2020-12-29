package jobs

import (
	"anc-courses/database"
	"context"

	"github.com/robfig/cron/v3"
)

func StartCronJobs() {
	c := cron.New()
	ctx := context.Background()

	c.AddFunc("@hourly", func() {
		if err := database.PostgresDB.Ping(ctx); err != nil {
			panic(err)
		}
	})
	c.Start()
}
