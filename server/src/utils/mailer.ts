import { contentSecurityPolicy } from "helmet";
import nodemailer from "nodemailer"

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

export default mailer