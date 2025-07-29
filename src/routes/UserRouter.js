import express from 'express';
import { UserController } from '../controllers/UserController.js';


class UserRouter {
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/signup', this.userController.signupUser);
        this.router.post('/login', this.userController.loginUser);
        this.router.get('/', this.userController.getUsers);
        this.router.get('/:id', this.userController.getUser);
        this.router.put('/update/:id', this.userController.updateUser);
        this.router.delete('/delete/:id', this.userController.deleteUser);
    }
}

const userRouter = new UserRouter().router;
export { userRouter }