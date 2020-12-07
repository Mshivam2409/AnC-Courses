"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const coursesController_1 = require("controllers/coursesController");
const express_1 = require("express");
const redisCache_1 = __importDefault(require("middleware/redisCache"));
const multer_1 = __importDefault(require("multer"));
const jsonParser = body_parser_1.json();
const multipartParser = multer_1.default();
const router = express_1.Router();
router.get("/getAllCourses", redisCache_1.default.route({ expire: 5000 }), coursesController_1.getAllCourses);
router.get("/getCourse/:cid", coursesController_1.getCourse);
router.get("/getReviews/:cid", coursesController_1.getReviewsbyCourse);
router.post("/secure/addCourse", multipartParser.any(), coursesController_1.AddCourse);
router.post("/secure/addReview", jsonParser, coursesController_1.addReview);
exports.default = router;
//# sourceMappingURL=router.js.map