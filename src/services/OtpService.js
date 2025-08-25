class OtpService {

    verifyUserOTP = async (body) => {
        const { otp, userId } = body;

        user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!otp) {
            return res.status(400).json({ message: "OTP is required" });
        }

        if (user.isVerified) {
            return res.status(200).json({ message: "User already verified" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpired < Date.now()) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        user.isVerified = true;
        user.otp = null;

        await user.save();
        return res.status(200).json({ message: "User verified successfully" });
    }

}