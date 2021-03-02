package database

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connect() *mongo.Database {
	// err := mgm.SetDefaultConfig(nil, "primary", options.Client().ApplyURI("mongodb+srv://anc:courses@primary.hsesw.mongodb.net/primarydb?retryWrites=true&w=majority"))
	// if err != nil {
	print(12)
	// }
	clientOptions := options.Client().ApplyURI("mongodb+srv://mshivam:mshivam@sd-320808.seh9w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		print(err.Error())
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		print(err.Error())
	}

	log.Printf("Connected to MongoDB!")
	database := client.Database("primarydb")
	return database
}

// AdminCollection sadsd
var MongoClient = connect()
