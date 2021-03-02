package database

import "go.mongodb.org/mongo-driver/mongo"

type mongoClient struct {
	Users   *mongo.Database
	Courses *mongo.Database
}

var usersClient = ConnectUsersDB()
var coursesClinet = ConnectCoursesDB()

var MongoClient = &mongoClient{Users: usersClient, Courses: coursesClinet}
