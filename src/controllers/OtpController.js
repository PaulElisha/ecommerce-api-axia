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
            await this.userService.verifyUserOTP(body);
            res.status(200).json({ message: "User verified successfully", status: "ok" });
        } catch (error) {
            return res.status(500).json({ status: "error", error: error.message });
        }
    }
}
