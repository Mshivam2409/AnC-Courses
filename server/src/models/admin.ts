import { Document, model, Schema } from "mongoose";

export interface IAdmin extends Document {
    _id: string
    name: string
    email: string
    username: string
    password: string
}

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export default model<IAdmin>("Admin", AdminSchema)