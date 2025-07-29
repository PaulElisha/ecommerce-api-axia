import { CartService } from '../services/cartService.js';

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    addOrCreateCart = async (req, res) => {
        const { user } = req.user;
        const { productId } = req.params;

        const param = {
            productId,
            user
        };

        try {
            await this.cartService.createCartItem(param, res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export { CartController };