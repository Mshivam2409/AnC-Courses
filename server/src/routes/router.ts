import { json } from "body-parser";
import { getCourse, getFile, getReviewsbyCourse, searchCourse } from "controllers/courseController";
import { AddCourse, addFiles, addReview, EditCourseContent, } from "controllers/adminController";
import { Router } from "express";
import redisCache from "middleware/redisCache";
import multer from "multer";
import jwt from "express-jwt"
import { Login } from "controllers/loginController";
import { publicKey } from "models/keys";
import { ClientSignin, ClientSignup } from "controllers/userController";

const jsonParser = json()
const multipartParser = multer()

const router = Router()

router.get("/wakeup", (req, res, next) => {
    res.status(200).json({ message: 'success' })
})
router.post("/signup", jsonParser, ClientSignup)
router.post("/signin", jsonParser, ClientSignin)
router.get("/getCourse/:cid", jwt({ secret: 'AnC@2020', algorithms: ['HS256'] }), getCourse)
router.get("/getReviews/:cid", jwt({ secret: 'AnC@2020', algorithms: ['HS256'] }), getReviewsbyCourse)
router.get("/getFile/:id", jwt({
    secret: 'AnC@2020', algorithms: ['HS256'], getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}), getFile)
router.get("/search/:code", redisCache.route({ expire: 5000 }), searchCourse)
router.post('/secure/signin', jsonParser, Login)
router.post("/secure/addCourse", multipartParser.any(), jwt({ secret: publicKey, algorithms: ['RS256'] }), AddCourse)
router.post("/secure/addReview", jsonParser, jwt({ secret: publicKey, algorithms: ['RS256'] }), addReview)
router.post('/secure/addFiles', multipartParser.any(), jwt({ secret: publicKey, algorithms: ['RS256'] }), addFiles)
router.post('/secure/editCourse/:cid', jsonParser, jwt({ secret: publicKey, algorithms: ['RS256'] }), EditCourseContent)

export default router