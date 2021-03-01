package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"

	"github.com/Mshivam2409/AnC-Courses/database"
	"github.com/Mshivam2409/AnC-Courses/googleapis"
	"github.com/Mshivam2409/AnC-Courses/graph/generated"
	"github.com/Mshivam2409/AnC-Courses/models"
	"github.com/Mshivam2409/AnC-Courses/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (r *mutationResolver) AddCourse(ctx context.Context, course models.NewCourse) (*models.Response, error) {
	i := fmt.Sprintf("%v", ctx.Value("Authorizaton"))
	a, err := services.OryClient.IsAuthorized(i, "read", "course")
	if !a {
		return &models.Response{Ok: false, Message: "Unauthorzed"}, err
	}
	d := googleapis.GetService()
	fid, err := d.CreateFolder(course.Number)
	c := &models.MGMCourse{Title: course.Title,
		Author:      course.Author,
		Credits:     course.Credits,
		Contents:    course.Contents,
		Offered:     course.Offered,
		Dept:        course.Dept,
		DriveFolder: fid,
		DriveFiles:  []string{},
	}
	_, err = database.MongoClient.Collection("courses").InsertOne(context.TODO(), c)
	return &models.Response{Ok: true, Message: "Course created Successfully!"}, err
}

func (r *queryResolver) GetCourseData(ctx context.Context, number string) (*models.CourseData, error) {
	// i := fmt.Sprintf("%v", ctx.Value("Authorizaton"))
	// a, err := services.OryClient.IsAuthorized(i, "read", "course")
	// if !a {
	// 	return &models.CourseData{}, err
	// }
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
	return reviews, err
}

func (r *queryResolver) SearchCourses(ctx context.Context, params *models.SearchParams) ([]*models.Course, error) {
	courses := []*models.Course{}
	if params.Identifier == "" {
		return courses, nil
	}
	filter := bson.D{{Key: "number", Value: bson.D{{Key: "$regex", Value: primitive.Regex{Pattern: "^" + params.Identifier, Options: "i"}}}}}
	limit := int64(10)
	cur, err := database.MongoClient.Collection("courses").Find(context.TODO(), filter, &options.FindOptions{Limit: &limit})
	if err != nil {
		print(err.Error())
	}
	for cur.Next(context.TODO()) {
		elem := &models.MGMCourse{}
		err := cur.Decode(elem)
		if err != nil {
			log.Fatal(err)
		}

		courses = append(courses, &models.Course{ID: elem.ID, Number: elem.Number, Credits: elem.Credits, Title: elem.Title})
	}
	if err := cur.Err(); err != nil {
		print(err.Error())
	}
	cur.Close(context.TODO())
	return courses, err
}

func (r *queryResolver) SearchUsers(ctx context.Context, params *models.SearchParams) ([]*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
