import backupDB from "backup";
import { compare } from "bcrypt";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Admin from "models/admin";
import HttpError from "models/httpError";
import { privateKey } from "models/keys";
import mailer from "utils/mailer";

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

const ResetPassword: RequestHandler = async (req, res, next) => {
    try {
        const username: string = req.body.username
        const existingAdmin = await Admin.findOne({ username: username })
        if (!existingAdmin)
            return next(new HttpError("User Does not Exist", 404))
        const token = jwt.sign({ username: username, email: existingAdmin.email }, privateKey, {
            expiresIn: "1h",
            algorithm: "RS256"
        })
        const mailOptions = {
            from: 'anc.courses@gmail.com', // sender address
            to: `${existingAdmin.email.trim()}`, // list of receivers
            subject: 'Password Reset', // Subject line
            html: `<head>
            <style type="text/css">
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 600;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
                        }
            
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 500;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
                        }
            
                        @font-face {
                          font-family: &#x27;Postmates Std&#x27;;
                          font-weight: 400;
                          font-style: normal;
                          src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
                        }
                    </style>
            <style media="screen and (max-width: 680px)">
                        @media screen and (max-width: 680px) {
                            .page-center {
                              padding-left: 0 !important;
                              padding-right: 0 !important;
                            }
                            
                            .footer-center {
                              padding-left: 20px !important;
                              padding-right: 20px !important;
                            }
                        }
                    </style>
            </head>
            <body style="background-color: #f4f4f5;">
            <table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
            <tbody><tr>
            <td style="text-align: center;">
            <table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
            <tbody><tr>
            <td>
            <table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
            <tbody><tr>
            <td style="padding-top: 24px;">
            <img src="https://d1pgqke3goo8l6.cloudfront.net/wRMe5oiRRqYamUFBvXEw_logo.png" style="width: 56px;">
            </td>
            </tr>
            <tr>
            <td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Reset your password</td>
            </tr>
            <tr>
            <td style="padding-top: 48px; padding-bottom: 48px;">
            <table cellpadding="0" cellspacing="0" style="width: 100%">
            <tbody><tr>
            <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            <tr>
            <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                  You're receiving this e-mail because you requested a password reset for your AnC account.
                                                </td>
            </tr>
            <tr>
            <td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                  Please tap the button below to choose a new password.
                                                </td>
            </tr>
            <tr>
            <td>
            <a data-click-track-id="37" href="https://anciitk.in/admin/change/${token}/${username}" style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase" target="_blank">
                                                    Reset Password
                                                  </a>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            <table align="center" cellpadding="0" cellspacing="0" id="footer" style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
            <tbody><tr>
            <td>
            <table align="center" cellpadding="0" cellspacing="0" class="footer-center" style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
            <tbody><tr>
            <td colspan="2" style="padding-top: 72px; padding-bottom: 24px; width: 100%;">
            </td>
            </tr>
            <tr>
            <td colspan="2" style="padding-top: 24px; padding-bottom: 48px;">
            <table cellpadding="0" cellspacing="0" style="width: 100%">
            <tbody><tr>
            <td style="width: 100%; height: 1px; max-height: 1px; background-color: #EAECF2; opacity: 0.19"></td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            <tr>
            <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                                      If you have any questions or concerns, I am here to help. Contact me via our <a data-click-track-id="1053" href="mailto:shivammalhotra08@gmail.com" style="font-weight: 500; color: #ffffff" target="_blank">Email</a>.
                                                    </td>
            </tr>
            <tr>
            <td style="height: 72px;"></td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </body>`// plain text body
        };
        await mailer.sendMail(mailOptions)
        res.status(200).json({ message: 'success' })
    } catch (error) {
        return next(new HttpError("Internal Server Error", 500))
    }
}

const ChangePassword: RequestHandler = async (req, res, next) => {
    try {
        const data: {
            username: string
            password: string
        } = req.body

        var existingAdmin = await Admin.findOne({ username: data.username })
        if (!existingAdmin) {
            return res.status(404).json({ message: 'User Not Found' })
        }
        existingAdmin.password = data.password

        await existingAdmin.save()
        return res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error)
        return next(new HttpError("Internal Server Error", 500))
    }
}

export { SignUp, Login, ResetPassword, ChangePassword }
