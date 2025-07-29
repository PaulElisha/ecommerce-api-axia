import { Schema, model } from "mongoose";

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Product = model("Product", productSchema);
export { Product };