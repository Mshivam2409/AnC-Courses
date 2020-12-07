"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.addReview = exports.getReviewsbyCourse = exports.getAllCourses = exports.AddCourse = void 0;
const backup_1 = __importDefault(require("backup"));
const course_1 = __importDefault(require("models/course"));
const httpError_1 = __importDefault(require("models/httpError"));
const review_1 = __importDefault(require("models/review"));
const mongoose_1 = require("mongoose");
const googleDriveEngine_1 = __importDefault(require("models/googleDriveEngine"));
const AddCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.parse(req.body.courseDetails);
    try {
        const session = yield mongoose_1.startSession();
        session.startTransaction();
        var createdCourse = new course_1.default({
            title: data.title,
            number: data.number,
            credits: data.credits,
            offered: data.offered,
            contents: data.contents,
            reviews: [],
            author: req.body.author
        });
        for (let index = 0; index < data.reviews.length; index++) {
            const review = data.reviews[index];
            const createdReview = new review_1.default({
                semester: review.semester,
                instructor: review.instructor,
                grading: review.grading,
                course: createdCourse.id
            });
            yield createdReview.save({ session: session });
            createdCourse.reviews = [...createdCourse.reviews, createdReview.id];
        }
        const googleResponse = yield googleDriveEngine_1.default._handleNewCourse(req.files, data);
        createdCourse.driveFolder = googleResponse.folderId;
        createdCourse.driveFiles = googleResponse.files;
        yield createdCourse.save({ session: session });
        yield session.commitTransaction();
        backup_1.default.set("courses", [...backup_1.default.get("courses").value(), createdCourse.toObject({ getters: true })]).write();
    }
    catch (error) {
        console.log(error);
        return next(new httpError_1.default("Failed", 500));
    }
    return res.end();
});
exports.AddCourse = AddCourse;
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    try {
        const session = yield mongoose_1.startSession();
        session.startTransaction();
        var course = yield course_1.default.findOne({ number: review.course });
        if (!course) {
            return next(new httpError_1.default("", 500));
        }
        const createdReview = new review_1.default({
            semester: review.semester,
            instructor: review.instructor,
            grading: review.grading,
            course: course === null || course === void 0 ? void 0 : course.id
        });
        createdReview.save({ session: session });
        course.reviews.push(createdReview.id);
        course.save({ session: session });
        session.commitTransaction();
    }
    catch (error) {
        console.log(error);
        return next(new httpError_1.default("Failed", 500));
    }
    res.end();
});
exports.addReview = addReview;
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.originalUrl);
    try {
        const courses = yield course_1.default.find({});
        res.json({ courses: courses.map(course => course.toObject({ getters: true })) });
    }
    catch (error) {
        console.log(error);
        return next(new httpError_1.default("Failed", 500));
    }
});
exports.getAllCourses = getAllCourses;
const getCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.default.findOne({ number: req.params.cid });
        if (course) {
            res.status(200).json(course.toObject({ getters: true }));
        }
        else {
            res.status(404).end();
        }
    }
    catch (error) {
        console.log(error);
        return next(new httpError_1.default("500", 500));
    }
});
exports.getCourse = getCourse;
const getReviewsbyCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.default.findOne({ number: req.params.cid });
        const id = course === null || course === void 0 ? void 0 : course.id;
        if (id) {
            const reviews = yield review_1.default.find({ course: id });
            res.json(reviews.map(review => review.toObject({ getters: true })));
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        console.log(error);
        return next(new httpError_1.default("500", 500));
    }
});
exports.getReviewsbyCourse = getReviewsbyCourse;
//# sourceMappingURL=coursesController.js.map