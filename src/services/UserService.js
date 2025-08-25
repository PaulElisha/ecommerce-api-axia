import { use } from "react";
import User from "../models/User";
import generateUserToken from "../utils/generateUserToken"


class UserService {

    signupUser = async (userData) => {

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpired = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        const foundUser = await User.findOne({ email: userData.email.toLowerCase() });
        if (foundUser) {
            const error = new Error('User with this email already exists');
            error.statusCode = 400;
            throw error;
        }
        const user = User.create({ ...userData, otp, otpExpired });
        if (!user) {
            const error = new Error('User creation failed');
            error.statusCode = 500;
            throw error;
        }
    }

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

    logoutUser = () => {
        return {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }
    };

    getUsers = async () => {
        const users = await User.find({}).select('-password');
        if (users.length === 0) {
            const error = new Error("No users found");
            error.statusCode = 404;
            throw error;
        }
        return users;
    }

    getUser = async () => {
        const user = await User.findById(id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    updateUser = async (id, data) => {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    updateUserProfile = async (id, data) => {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                'profile.country': data.country,
                'profile.number': data.number,
                'profile.street': data.street,
                'profile.bio': data.bio
            }
        }, { new: true });
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        return user;
    }

    deleteUser = async (id) => {
        const user = await User.findByIdAndDelete(id);
        if (user !== null || user !== undefined) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
    }
}

export { UserService }