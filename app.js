import express from 'express';
import cookieParser from 'cookie-parser';

import { cartRouter } from './src/routers/CartRouter.js';
import { productRouter } from './src/routers/ProductRouter.js';
import { userRouter } from './src/routers/UserRouter.js';
import { authRouter } from './src/routers/AuthRouter.js';
import { otpRouter } from './src/routers/OtpRouter.js';

import { config } from "dotenv";
config({ path: ".env" });

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Port and Hostname:", `${port} - ${hostname} - ${MONGODB_URI}`);

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    initializeRoutes() {
        this.app.use('/api/users', userRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/cart', cartRouter);
        this.app.use('/api/products', productRouter);
        this.app.use('/api/otp', otpRouter);
    }

    startServer() {
        this.app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    }
}

const app = new App();
app.startServer();