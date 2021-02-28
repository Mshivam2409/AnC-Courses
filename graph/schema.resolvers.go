package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"

	"github.com/Mshivam2409/AnC-Courses/database"
	"github.com/Mshivam2409/AnC-Courses/graph/generated"
	"github.com/Mshivam2409/AnC-Courses/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (r *queryResolver) GetCourses(ctx context.Context) ([]*models.Course, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) GetCourseData(ctx context.Context, number string) (*models.CourseData, error) {
	i := fmt.Sprintf("%v", ctx.Value("Authorizaton"))
	print(i)
	c := &models.MGMCourse{}
	filter := bson.D{{Key: "number", Value: number}}
	err := database.MongoClient.Collection("courses").FindOne(context.TODO(), filter).Decode(c)
	if err != nil {
		print(err.Error())
	}
	cid, err := primitive.ObjectIDFromHex(c.ID)
	filter = bson.D{{Key: "course", Value: cid}}
	cur, err := database.MongoClient.Collection("reviews").Find(context.TODO(), filter)
	reviews := []*models.Review{}
	for cur.Next(context.TODO()) {
		elem := &models.MGMReview{}
		err := cur.Decode(elem)
		if err != nil {
			log.Fatal(err)
		}

		reviews = append(reviews, &models.Review{ID: elem.ID, Semester: elem.Semester})
	}
	if err := cur.Err(); err != nil {
		print(err.Error())
	}
	cur.Close(context.TODO())
	d := &models.CourseData{
		Course: &models.Course{
			Title:      c.Title,
			Number:     c.Number,
			Credits:    c.Credits,
			Offered:    c.Offered,
			Contents:   c.Contents,
			DriveFiles: c.DriveFiles,
			ID:         c.ID,
			Dept:       c.Dept,
			Author:     c.Author,
		},
		Reviews: reviews,
	}
	return d, err
}

func (r *queryResolver) GetReviewsbyCourse(ctx context.Context, number string) ([]*models.Review, error) {
	c := &models.MGMCourse{}
	filter := bson.D{{"number", number}}
	err := database.MongoClient.Collection("courses").FindOne(context.TODO(), filter).Decode(c)
	if err != nil {
		print(err.Error())
	}
	cid, err := primitive.ObjectIDFromHex(c.ID)
	filter = bson.D{{"course", cid}}
	cur, err := database.MongoClient.Collection("reviews").Find(context.TODO(), filter)
	reviews := []*models.Review{}
	for cur.Next(context.TODO()) {
		elem := &models.MGMReview{}
		err := cur.Decode(elem)
		if err != nil {
			log.Fatal(err)
		}
		reviews = append(reviews, &models.Review{ID: elem.ID, Semester: elem.Semester})
	}

	if err := cur.Err(); err != nil {
		print(err.Error())
	}
	cur.Close(context.TODO())
	return reviews, err
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
