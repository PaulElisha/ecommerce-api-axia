import nodemailer from 'nodemailer';

class MailForwarder {

    sendMail = async (req, res) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_PORT === '465',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mail = {
            from: `Sender Name <${process.env.EMAIL_USER}>`,
            to: `Recipient <${req.body.email}>`,
            subject: "Welcome to Our Service",
            text: `Hello ${req.body.username}, welcome to our service!`
        };

        try {
            const info = await transporter.sendMail(mail);
            res.status(200).json({ status: true, message: info });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: "Failed to send email", error: error.message });
        }
    }
}

const forwarder = new MailForwarder();
export { forwarder }
