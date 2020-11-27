import { json } from "body-parser";
import { AddCourse, addReview, getAllCourses, getReviewsbyCourse } from "controllers/coursesController";
import { Router } from "express";
import multer from "multer";

const jsonParser = json()
const multipartParser = multer()

const router = Router()

router.get("/getAllCourses", jsonParser, getAllCourses)
router.get("/getReviews/:cid", jsonParser, getReviewsbyCourse)
router.post("/secure/addCourse", multipartParser.any(), AddCourse)
router.post("/secure/addReview", jsonParser, addReview)

export default router