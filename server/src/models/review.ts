import { Document, model, Schema, Types } from "mongoose";

export interface IReview extends Document {
    _id: string
    semester: string,
    instructor: string,
    grading: string,
    course: Types.ObjectId
}

const ReviewSchema = new Schema({
    semester: { type: String, required: true },
    instructor: { type: String, required: true },
    grading: { type: String, required: true },
    course: { type: Types.ObjectId, required: true, ref: "Course" },
})

export default model<IReview>("Review", ReviewSchema)