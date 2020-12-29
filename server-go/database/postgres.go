package database

import (
	"context"

	"github.com/go-pg/pg/v10"
)

func postgre() *pg.DB {

	db := pg.Connect(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "password",
		Database: "db_name",
	})
	ctx := context.Background()
	if err := db.Ping(ctx); err != nil {
		panic(err)
	}
	return db
}

var PostgresDB = postgre()
