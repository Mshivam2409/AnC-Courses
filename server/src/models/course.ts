import { Document, model, Schema, Types } from "mongoose";

export interface ICourse extends Document {
    _id: string
    title: string
    number: string
    credits: string
    offered: string
    contents: string
    driveFolder: string,
    driveFiles: Array<string>
    reviews: Array<Types.ObjectId>
    author: string
    dept: string
}

const CourseSchema = new Schema({
    title: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    credits: { type: String, required: true },
    offered: { type: String, required: true },
    contents: { type: String, required: true },
    driveFolder: { type: String, required: true },
    driveFiles: [{ type: String, required: true }],
    reviews: [{ type: Types.ObjectId, required: true, ref: "Review" }],
    author: { type: String, required: true },
    dept: { type: String, required: true }
})

export default model<ICourse>("Course", CourseSchema)