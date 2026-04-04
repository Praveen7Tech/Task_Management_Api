import { AwilixContainer } from "awilix";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export default (container: AwilixContainer): Router =>{
    const router = Router()

    const authController = container.resolve<AuthController>('authController')

    router.post('/signup', authController.signup)

    return router;
}