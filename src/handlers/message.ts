import nodeMailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

async function send(req, res) {
    const {
        email,
        message,
        name,
    } = req.body;

    let transportOptions: SMTPTransport.Options = {
        service: null,
        host: "localhost",
        port: 1025,
        auth: null,
    }

    if (process.env.NODE_ENV === "production") {
        transportOptions = {
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.PASSWORD,
            }
        }
    }

    const transporter = nodeMailer.createTransport(transportOptions);

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `Message From Website`,
            html: `You got a message from 
            Email : ${email}
            Name: ${name}
            Message: ${message}`,
        });
        return res.send({});
    } catch (error) {
        return res
            .status(500)
            .send({});
    }
}

export default {
    send
};