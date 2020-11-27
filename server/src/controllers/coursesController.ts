import backupDB from "backup";
import { RequestHandler } from "express";
import Course from "models/course";
import HttpError from "models/httpError";
import Review from "models/review";
import { startSession } from "mongoose";
import { IBCourse, IBReview } from "types";
import GoogleDriveStorage from "models/googleDriveEngine";


const AddCourse: RequestHandler = async (req, res, next) => {
    const data: IBCourse = JSON.parse(req.body.courseDetails)
    try {
        const session = await startSession();
        session.startTransaction();
        var createdCourse = new Course({
            title: data.title,
            number: data.number,
            credits: data.credits,
            offered: data.offered,
            contents: data.contents,
            reviews: [],
            author: req.body.author
        })
        for (let index = 0; index < data.reviews.length; index++) {
            const review = data.reviews[index];
            const createdReview = new Review({
                semester: review.semester,
                instructor: review.instructor,
                grading: review.grading,
                course: createdCourse.id
            })
            await createdReview.save({ session: session })
            createdCourse.reviews = [...createdCourse.reviews, createdReview.id]
        }
        const googleResponse = await GoogleDriveStorage._handleNewCourse(req.files as Express.Multer.File[], data)
        createdCourse.driveFolder = googleResponse.folderId
        createdCourse.driveFiles = googleResponse.fileIds
        await createdCourse.save({ session: session })
        await session.commitTransaction()
        backupDB.set("courses", [...backupDB.get("courses").value(), createdCourse.toObject({ getters: true })]).write();
    } catch (error) {
        console.log(error)
        return next(new HttpError("Failed", 500))
    }
    return res.end()
}

const addReview: RequestHandler = async (req, res, next) => {
    const review: IBReview = req.body
    try {
        const session = await startSession();
        session.startTransaction();
        var course = await Course.findOne({ number: review.course })
        if (!course) {
            return next(new HttpError("", 500))
        }
        const createdReview = new Review({
            semester: review.semester,
            instructor: review.instructor,
            grading: review.grading,
            course: course?.id
        })
        createdReview.save({ session: session })
        course.reviews.push(createdReview.id)
        course.save({ session: session })
        session.commitTransaction()
    } catch (error) {
        console.log(error)
        return next(new HttpError("Failed", 500))
    }
    res.end()
}

const getAllCourses: RequestHandler = async (req, res, next) => {
    try {
        const courses = await Course.find({})
        res.json({ courses: courses.map(course => course.toObject({ getters: true })) })
    }
    catch (error) {
        console.log(error)
        return next(new HttpError("Failed", 500))
    }
}

const getReviewsbyCourse: RequestHandler = async (req, res, next) => {
    try {
        const course = await Course.findOne({ number: req.params.cid })
        const id = course?.id
        if (id) {
            const reviews = await Review.find({ course: id })
            res.json({ reviews: reviews.map(review => review.toObject({ getters: true })) })
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        console.log(error)
        return next(new HttpError("500", 500))
    }
}

export { AddCourse, getAllCourses, getReviewsbyCourse, addReview }