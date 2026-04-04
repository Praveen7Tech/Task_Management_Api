import { AwilixContainer } from "awilix";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export default (container: AwilixContainer): Router =>{
    const router = Router()

    const authController = container.resolve<AuthController>('authController')

    router.post('/register', authController.signup)
    router.post('/verify-otp', authController.verfiyOtp)
    router.post('/resend-otp', authController.resendOtp)
    router.post("/login", authController.login)

    return router;
}