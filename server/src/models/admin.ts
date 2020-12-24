import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt"

export interface IAdmin extends Document {
    _id: string
    name: string
    email: string
    username: string
    password: string
    role: "Coordinator" | "Secretary" | "Developer"
}

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

AdminSchema.pre('save', async function (this: IAdmin, next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

export default model<IAdmin>("Admin", AdminSchema)