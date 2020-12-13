import { json } from "body-parser";
import { getAllCourses, getCourse, getFile, getReviewsbyCourse, searchCourse } from "controllers/clientController";
import { AddCourse, addFiles, addReview, } from "controllers/adminController";
import { Router } from "express";
import redisCache from "middleware/redisCache";
import multer from "multer";
import jwt from "express-jwt"

const jsonParser = json()
const multipartParser = multer()

const router = Router()

router.get("/getAllCourses", redisCache.route({ expire: 5000 }), getAllCourses)
router.get("/getCourse/:cid", getCourse)
router.get("/getReviews/:cid", getReviewsbyCourse)
router.get("/getFile/:id", getFile)
router.get("/search/:code", redisCache.route({ expire: 5000 }), searchCourse)
router.post('/signin')
// Secured Routes
// router.use(jwt({ secret: "sd" }))
router.post("/secure/addCourse", multipartParser.any(), AddCourse)
router.post("/secure/addReview", jsonParser, addReview)
router.post('/secure/addFiles', multipartParser.any(), addFiles)

export default router