import express from 'express';
import { ProductController } from '../controllers/ProductController'
import { Authorization } from '../middlewares/authorization';

class ProductRouter {
    constructor() {
        this.router = express.Router();
        this.productController = new ProductController();
        this.userAccess = new Authorization()
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/create', this.userAccess.authorize, this.productController.createProduct);
        this.router.get('/', this.productController.getProducts);
        this.router.get('/search', this.productController.getProductByParam);
        this.router.get('/user', this.productController.getUserProducts);
        this.router.put('/update/:id', this.userAccess.authorize, this.productController.updateProduct);
        this.router.delete('/delete/:id', this.userAccess.authorize, this.productController.deleteProduct)
    }
}

const productRouter = new ProductRouter().router;
export { productRouter }