import express from 'express';
import { CartController } from './../controllers/cartController.js';
import { Authorization } from '../middlewares/authorization.js';

class CartRouter {
    constructor() {
        this.router = express.Router();
        this.cartController = new CartController();
        this.userAccess = new Authorization();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/create/:productId', this.userAccess.authorize, this.cartController.addOrCreateCart);
    }
}

const cartRouter = new CartRouter().router;
export { cartRouter }