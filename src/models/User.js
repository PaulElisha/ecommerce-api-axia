import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        toLowerCase: true,

    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    AltimatAdmin: {
        type: Boolean,
        default: false
    },
    profile: {
        country: {
            type: String,
            required: true,
        },
        Number: {
            type: Number,
            required: true
        },
        Street: {
            type: String,
            required: true
        },
        Bio: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);
export { User };