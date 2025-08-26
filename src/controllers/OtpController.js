import { MailForwarder } from '../config/MailForwarder.js';
import { OtpService } from '../services/OtpService.js';

class OtpController {
    constructor() {
        this.otpService = new OtpService();
    }

    verifyUserOTP = async (req, res) => {
        let { otp } = req.body;
        let { userId } = req.user._id;

        const body = { otp, userId };

        try {
            await this.otpService.verifyUserOTP(body);
            res.status(200).json({ message: "User verified successfully", status: "ok" });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message });
        }
    }

    resendUserOTP = async (req, res) => {
        try {
            const mailText = await this.otpService.resendUserOTP(req.body);

            const forwarder = new MailForwarder(mailText);
            forwarder.sendMail(req, res);

            res.status(200).json({ message: "OTP resent successfully", status: "ok" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ status: "error", error: error.message });
        }
    }
}

export { OtpController }