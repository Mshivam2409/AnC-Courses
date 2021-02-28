import { simpleParser } from "mailparser";
import { createTransport } from "nodemailer";
import { SMTPServer } from "smtp-server";

const mailer = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

const smtp_server = new SMTPServer({
    onData(stream, session, callback) {
        simpleParser(stream).then((mail) => {
            const mailOptions = {
                from: 'no-reply@anciitk.in', // sender address
                to: mail.to.value.map((address) => {
                    return address.address
                }), // list of receivers
                subject: 'New User Registration', // Subject line
                html: mail.html !== false ? mail.html : ""// plain text body
            };
            mailer.sendMail(mailOptions).then(() => console.log(`Email Sent! To ${mailOptions.to}`)).catch((res) => console.error(res))
        }).catch((error) => console.error(error))
    }
})
// smtp_server.server.
smtp_server.listen(9009, () => {
    console.log(`Listening on Port 9009`)
})