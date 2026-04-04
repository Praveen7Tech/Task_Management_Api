import { asClass } from "awilix";
import { AuthController } from "../../../interface_adapter/http/controllers/auth.controller";
import { SignUpUseCase } from "../../../usecases/auth/signup.UseCase";
import { UserRepository } from "../../repositories/user.repository";
import { OtpService } from "../../services/otp.service";
import { PasswordService } from "../../services/password.service";
import { EmailService } from "../../services/email.service";

export const authModule = {

    _userRepository: asClass(UserRepository).singleton(),
    _otpService: asClass(OtpService).singleton(),
    _passwordService: asClass(PasswordService).singleton(),
    _emailService: asClass(EmailService).singleton(),

    signupUsecase: asClass(SignUpUseCase).scoped(),

    authController: asClass(AuthController).singleton()
}