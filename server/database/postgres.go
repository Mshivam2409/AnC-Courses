package database

import (
	"github.com/go-pg/pg/v10"
)

func postgre() *pg.DB {

	db := pg.Connect(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "password",
		Database: "db_name",
	})
	return db
}

var PostgresDB = postgre()
