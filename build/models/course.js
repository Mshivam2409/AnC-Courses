"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    credits: { type: String, required: true },
    offered: { type: String, required: true },
    contents: { type: String, required: true },
    driveFolder: { type: String, required: true },
    driveFiles: [{ type: String, required: true }],
    reviews: [{ type: mongoose_1.Types.ObjectId, required: true, ref: "Review" }],
    author: { type: String, required: true }
});
exports.default = mongoose_1.model("Course", CourseSchema);
//# sourceMappingURL=course.js.map