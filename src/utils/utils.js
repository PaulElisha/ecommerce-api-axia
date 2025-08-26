import jwt from "jsonwebtoken";

export const generateUserToken = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

export const generateUserOtp = () => {
    return {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
    }
}