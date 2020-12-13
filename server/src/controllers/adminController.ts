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
            dept: data.dept,
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
        createdCourse.driveFiles = googleResponse.files
        await createdCourse.save({ session: session })
        await session.commitTransaction()
        backupDB.set("courses", [...backupDB.get("courses").value(), createdCourse.toObject({ getters: true })]).write();
        return res.status(201).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return next(new HttpError("Failed", 500))
    }
}

const addReview: RequestHandler = async (req, res, next) => {
    const review: IBReview = req.body
    try {
        const session = await startSession();
        session.startTransaction();
        var course = await Course.findOne({ number: review.course })
        if (!course) {
            return next(new HttpError("Course not Found!", 404))
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
        return res.status(201).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return next(new HttpError("Failed", 500))
    }
}

const addFiles: RequestHandler = async (req, res, next) => {
    try {
        const files = req.files as Express.Multer.File[];
        const cid = req.body.cid;
        var course = await Course.findById(cid)
        if (course) {
            const resp = await GoogleDriveStorage._handleFiles(files, course.driveFolder);
            course.driveFiles = [...course.driveFiles, ...resp];
            course.save();
            return res.status(201).json({ message: 'success' })
        }
        else {
            return next(new HttpError('Course not Found!', 404))
        }
    }
    catch (err) {
        console.log(err);
        return next(new HttpError("Failed", 500))
    }
}

export { addFiles, addReview, AddCourse }