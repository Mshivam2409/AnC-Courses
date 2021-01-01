package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func getMongoDBClient() *mongo.Database {
	var url = "mongodb+srv://mshivam:lovelydidi@sd-320808.seh9w.mongodb.net/places?retryWrites=true&w=majority"
	client, err := mongo.NewClient(options.Client().ApplyURI(url))
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.Background())
	if err != nil {
		panic(err)
	}
	db := client.Database("places")
	return db
}

var MongoDB = getMongoDBClient()
