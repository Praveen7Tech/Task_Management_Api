import { asClass } from "awilix";
import { AuthController } from "../../../interface_adapter/http/controllers/auth.controller";
import { SignUpUseCase } from "../../../usecases/auth/signup.UseCase";
import { UserRepository } from "../../repositories/user.repository";
import { OtpService } from "../../services/otp.service";
import { PasswordService } from "../../services/password.service";
import { EmailService } from "../../services/email.service";
import { VerifyOtpUsecase } from "../../../usecases/auth/verifyOtp.UseCase";
import { VerificationRepository } from "../../repositories/verification.repository";
import { ResendOtpUseCase } from "../../../usecases/auth/resendOtp.UseCase";
import { LoginUseCase } from "../../../usecases/auth/login.UseCase";
import { JwtTokenService } from "../../services/token.service";
import { HealthCheckUseCase } from "../../../usecases/auth/healthCheck.UseCase";

export const authModule = {

    _userRepository: asClass(UserRepository).singleton(),
    _verificationRepository: asClass(VerificationRepository).scoped(),
    _otpService: asClass(OtpService).singleton(),
    _passwordService: asClass(PasswordService).singleton(),
    _emailService: asClass(EmailService).singleton(),
    _tokenService: asClass(JwtTokenService).singleton(),

    _signupUsecase: asClass(SignUpUseCase).scoped(),
    _verifyOtoUseCase: asClass(VerifyOtpUsecase).scoped(),
    _resendOtpUsecase: asClass(ResendOtpUseCase).scoped(),
    _loginUsecase: asClass(LoginUseCase).scoped(),
    _healthCheckUsecase: asClass(HealthCheckUseCase).singleton(),

    authController: asClass(AuthController).singleton()
}