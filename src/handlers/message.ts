async function send(req, res) {
    const {
        email,
        message,
        name,
    } = req.body;
    const nodeMailer = require('nodemailer')

    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.EMAIL,
            subject: `subject`,
            html: `You got a message from 
            Email : ${email}
            Name: ${name}
            Message: ${message}`,
        });
        return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    send
};