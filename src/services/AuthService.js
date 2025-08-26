import generateUserToken from "../utils/utils";
import User from "../models/User";


class AuthService {

    loginUser = async (loginDetails) => {

        const user = await User.findOne({ email: loginDetails.email.toLowerCase() })

        if (!user) {
            const error = new Error("User not found. Register User");
            error.statusCode = 404;
            throw error;
        }

        user.comparePassword(loginDetails.password, (err, isMatch) => {
            if (err || !isMatch) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error
            }
        });

        const token = generateUserToken(user);

        return token;
    }

    resetPassword = async (email,) => {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 20 * 60 * 1000;
        await user.save();

        return token;
    }

    resetPasswordRequest = async () => {
        const { token, newPassword } = resetDetails;

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            const error = new Error("Invalid or expired token");
            error.statusCode = 400;
            throw error;
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    }
}

export { AuthService }