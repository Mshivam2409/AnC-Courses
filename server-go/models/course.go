package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Course Structure
type Course struct {
	_id         string               `bson:"_id,omitempty"`
	title       string               `bson:"title,omitempty"`
	number      string               `bson:"number,omitempty"`
	credits     string               `bson:"credits,omitempty"`
	offered     string               `bson:"offered,omitempty"`
	contents    string               `bson:"contents,omitempty"`
	driveFolder string               `bson:"driveFolder,omitempty"`
	driveFiles  []string             `bson:"driveFiles,omitempty"`
	reviews     []primitive.ObjectID `bson:"reviews,omitempty"`
	author      string               `bson:"author,omitempty"`
	dept        string               `bson:"dept,omitempty"`
}
