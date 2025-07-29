import express from 'express';
import { CartController } from './../controllers/cartController.js';

class CartRouter {
    constructor() {
        this.router = express.Router();
        this.cartController = new CartController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/create/:productId', this.cartController.addOrCreateCart);
    }
}

const cartRouter = new CartRouter().router;
export { cartRouter }