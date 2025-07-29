import express from 'express';
import { ProductController } from '../controllers/ProductController'

class ProductRouter {
    constructor() {
        this.router = express.Router();
        this.productController = new ProductController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/create', this.productController.createProduct);
        this.router.get('/', this.productController.getProducts);
        this.router.get('/search', this.productController.getProductByParam);
        this.router.get('/user', this.productController.getUserProducts);
        this.router.put('/update/:id', this.productController.updateProduct);
        this.router.delete('/delete/:id', this.productController.deleteProduct)
    }
}

const productRouter = new ProductRouter().router;
export { productRouter }