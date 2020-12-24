import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import HttpError from "models/httpError";
import User from "models/user";
import jwt from "jsonwebtoken";
import mailer from "utils/mailer";

const ClientSignup: RequestHandler = async (req, res, next) => {
    const userName = req.body.userName
    const password = randomBytes(8).toString('hex')
    try {
        await User.sync()
        const existingUser = await User.findOne({ where: { userName: userName } })
        if (existingUser) {
            return next(new HttpError('Account already exists! Please check your email for password!', 422))
        }
        const newUser = new User({
            userName: userName,
            password: password
        })
        const mailOptions = {
            from: 'anc.courses@gmail.com', // sender address
            to: `${userName}@iitk.ac.in`, // list of receivers
            subject: 'New User Registration', // Subject line
            html: `<p>Dear User,<br/>Your password is ${password}. Please keep it safe for all future correspondences.</p>`// plain text body
        };
        await mailer.sendMail(mailOptions)
        await newUser.save()
        res.status(201).json({ message: 'Successful Registration!', password: password })
    } catch (error) {
        console.log(error)
        return next(new HttpError('Internal Server Error', 500))
    }
}

const ClientSignin: RequestHandler = async (req, res, next) => {
    const { userName, password } = req.body
    const existingUser = await User.findOne({ where: { userName: userName } })
    if (!existingUser)
        return next(new HttpError('User Does not Exist', 404))
    const isValidPassword = (existingUser.getDataValue('password') === password)
    if (!isValidPassword)
        return next(new HttpError("Invalid Password!", 403))
    const token = jwt.sign(existingUser.toJSON(), 'AnC@2020', { expiresIn: '3h' })
    res.status(200).json({ message: 'Login Successful', token: token })
}

export { ClientSignup, ClientSignin }



