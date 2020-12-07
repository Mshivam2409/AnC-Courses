"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    semester: { type: String, required: true },
    instructor: { type: String, required: true },
    grading: { type: String, required: true },
    course: { type: mongoose_1.Types.ObjectId, required: true, ref: "Course" },
});
exports.default = mongoose_1.model("Review", ReviewSchema);
//# sourceMappingURL=review.js.map