import { asClass } from "awilix";
import { AuthController } from "../../../interface_adapter/http/controllers/auth.controller";

export const authModule = {
    authController: asClass(AuthController).singleton()
}