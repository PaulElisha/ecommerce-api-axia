import { ProductService } from '../services/productService.js';

class ProductController {

    constructor() {
        this.productService = new ProductService();
    }

    createProduct = async (req, res) => {
        try {
            await this.productService.createProduct(req.body);
            res.status(201).json({ message: 'Product created successfully' });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.productService.getProducts(req.query);
            res.status(200).json(products);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    getProductByParam = async (req, res) => {
        const query = {};
        const { name, price, year } = req.query;
        if (name) query.name = name;
        if (price) query.price = price;
        if (year) query.year = year;

        try {
            const product = await this.productService.getProductByParam(query);
            res.status(200).json(product);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    getUserProducts = async (req, res) => {
        try {
            const products = await this.productService.getUserProducts(req.user);
            res.status(200).json(products);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    updateProduct = async (req, res) => {
        const productUpdate = req.body;
        const productId = req.params.id;
        const user = req.user;
        if (!productUpdate || Object.keys(productUpdate).length === 0) {
            return res.status(400).json({ message: 'No product data provided for update' });
        }

        const filter = { _id: productId, userId: user._id };

        try {
            const updatedProduct = await this.productService.updateProduct(filter, productUpdate);
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    deleteProduct = async (req, res) => {
        const productId = req.params.id;
        const user = req.user;

        try {
            const deletedProduct = await this.productService.deleteProduct({ _id: productId, userId: user._id });
            res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

export { ProductController };