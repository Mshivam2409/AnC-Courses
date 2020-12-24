import backupDB from "backup";
import { compare } from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Admin from "models/admin";
import HttpError from "models/httpError";
import { privateKey } from "models/keys";

const SignUp: RequestHandler = async (req, res, next) => {
    try {
        const data: {
            name: string
            email: string
            username: string
            password: string
        } = req.body

        const existingAdmin = await Admin.findOne({ username: data.username })
        if (existingAdmin) {
            return res.status(422).json({ message: 'Duplicate User' })
        }

        const newAdmin = new Admin({
            name: data.name,
            email: data.email,
            username: data.username,
            password: data.password,
            role: "Developer"
        })
        await newAdmin.save()
        return res.status(201).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return next(new HttpError("Internal Server Error", 500))
    }
}

const Login: RequestHandler = async (req, res, next) => {
    try {
        // console.log(req)
        const { username, password } = req.body
        const existingAdmin = await Admin.findOne({ username: username })
        if (!existingAdmin)
            return next(new HttpError("User Does not Exist", 404))
        const isValidPassword = await compare(password, existingAdmin.password)
        if (!isValidPassword)
            return next(new HttpError('Password does not match!', 403))
        const token = jwt.sign({ username: username, password: password }, privateKey, {
            expiresIn: "1h",
            algorithm: "RS256"
        })
        return res.status(200).json({ message: 'success', token: token, username: username })
    } catch (error) {
        console.log(error)
        return next(new HttpError('Internal Server Error', 500))
    }
}

export { SignUp, Login }
