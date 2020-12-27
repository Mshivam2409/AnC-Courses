import { RequestHandler } from "express";
import HttpError from "models/httpError";
import User from "models/user";
import jwt from "jsonwebtoken";
import mailer from "utils/mailer";

const ClientSignup: RequestHandler = async (req, res, next) => {
    const userName = req.body.userName
    try {
        const existingUser = await User.findOne({ where: { userName: userName } })
        if (!existingUser) {
            return next(new HttpError('Invalid Username! Please Enter a Valid Username!', 404))
        }
        const mailOptions = {
            from: 'anc.courses@gmail.com', // sender address
            to: `${userName}@iitk.ac.in`, // list of receivers
            subject: 'New User Registration', // Subject line
            html: `<p>Dear User,<br/>Your password is ${existingUser.getDataValue('password')}. Please keep it safe for all future correspondences.</p>`// plain text body
        };
        await mailer.sendMail(mailOptions)
        res.status(201).json({ message: 'Successful Registration!' })
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
    const token = jwt.sign(existingUser.toJSON(), process.env.SECRET as string, { expiresIn: '3h' })
    res.status(200).json({ message: 'Login Successful', token: token })
}

export { ClientSignup, ClientSignin }



