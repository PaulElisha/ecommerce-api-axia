import express from 'express';
import { OtpControlller } from '../controllers/UserController.js';
import { Authorization } from '../middlewares/authorization.js';


class OtpRouter {
    constructor() {
        this.router = express.Router();
        this.otpController = new OtpControlller();
        this.userAccess = new Authorization();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/verify', this.userAccess.authorize, this.otp.verifyUserOTP);
    }
}

const otpRouter = new OtpRouter().router;
export { otpRouter }