import { json } from "body-parser";
import { AddCourse, addReview, getAllCourses, getCourse, getReviewsbyCourse } from "controllers/coursesController";
import { Router } from "express";
import redisCache from "middleware/redisCache";
import multer from "multer";

const jsonParser = json()
const multipartParser = multer()

const router = Router()

router.get("/getAllCourses", redisCache.route({ expire: 5000 }), getAllCourses)
router.get("/getCourse/:cid", getCourse)
router.get("/getReviews/:cid", getReviewsbyCourse)
router.post("/secure/addCourse", multipartParser.any(), AddCourse)
router.post("/secure/addReview", jsonParser, addReview)

export default router