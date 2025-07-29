import { Cart } from '../models/cartModel.js';
import { Product } from '../models/productModel.js';

class CartService {
    createCartItem = async (param, res) => {
        const { productId, user } = param;

        const foundProduct = await Product.findById(productId);
        if (!foundProduct) {
            return res.status(400).json({ message: "The product can not be found" });
        }

        let cart = await Cart.findOne({ userId: user._id });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            }
            cart.products.push({ productId, quantity: 1 });

            await cart.save();
            return res.status(201).json({ message: 'Cart successfully updated' });
        }

        cart = await Cart.create({
            userId: user._id,
            products: [{ productId, quantity: 1 }]
        });

        if (!cart) {
            const error = new Error('Server error, cart creation failed');
            error.statusCode = 500;
            throw error;
        }

        return res.status(201).json({ message: 'Cart created and product added successfully' });
    }
}

export { CartService };