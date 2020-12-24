import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import Course from "models/course";
import GoogleDriveStorage from "models/googleDriveEngine";
import HttpError from "models/httpError";
import Review from "models/review";


const getCourse: RequestHandler = async (req, res, next) => {
    try {
        const course = await Course.findOne({ number: req.params.cid })
        if (course) {
            return res.status(200).json(course.toObject({ getters: true }))
        }
        else {
            return next(new HttpError("Course Not Found!", 404))
        }
    }
    catch (error) {
        console.log(error)
        return next(new HttpError("500", 500))
    }
}

const searchCourse: RequestHandler = async (req, res, next) => {
    const code = req.params.code
    try {
        const courses = await Course.find({
            number: {
                $regex: new RegExp("^" + code.toLowerCase(), "i")
            }
        }).limit(20)
        if (courses) {
            return res.status(200).json(courses.map((course) => { return course.toObject({ getters: true }) }))
        }
        else {
            return res.status(200).json([])
        }
    }
    catch (error) {
        console.log(error)
        return next(new HttpError("500", 500))
    }
}

const getReviewsbyCourse: RequestHandler = async (req, res, next) => {
    try {
        const course = await Course.findOne({ number: req.params.cid })
        const id = course?.id
        if (id) {
            const reviews = await Review.find({ course: id })
            return res.json(reviews.map(review => review.toObject({ getters: true })))
        }
        else {
            return res.json([]);
        }
    }
    catch (error) {
        console.log(error)
        return next(new HttpError("500", 500))
    }
}

const getFile: RequestHandler = async (req, res, next) => {
    try {
        const fileId = req.params.id;
        const mimeType = req.query.mimeType;
        const fileBuff = await GoogleDriveStorage._getFile(fileId);
        const name = randomBytes(8).toString('hex') + "." + mimeType
        res.set('Access-Control-Expose-Headers', 'Content-Disposition')
        res.set("Content-Disposition", "attachment; filename=" + name);
        return res.send(fileBuff);
    }
    catch (error) {
        console.log(error)
        return next(new HttpError('Failed to Fetch Fil!', 500))
    }
}

export { getReviewsbyCourse, getCourse, searchCourse, getFile }