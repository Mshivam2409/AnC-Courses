package database

import (
	"context"
	"log"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mongoClient struct {
	Users   *mongo.Database
	Courses *mongo.Database
}

// MongoClient ...
var MongoClient = &mongoClient{}

// ConnectMongo ..
func ConnectMongo() {
	MongoClient.Users = connect(viper.GetString("mongo.users"), "primarydb")
	MongoClient.Courses = connect(viper.GetString("mongo.courses"), "students")
}

func connect(url string, dbname string) *mongo.Database {
	clientOptions := options.Client().ApplyURI(url)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatalf("Unable to Connect to MongoDB %v", err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatalf("Unable to Connect to MongoDB %v", err)
	}
	log.Printf("Connected to MongoDB! URL : %s", url)
	database := client.Database(dbname)
	return database
}
