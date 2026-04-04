import { SignUpDTO } from "../../application/dto/auth/signup.dto";
import { ISignUpUseCase } from "../../application/interfaces/usecase/auth.usecase.interface";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IVerificationRepository } from "../../domain/repositories/verification.repository";
import { IEmailService } from "../../domain/services/email.service";
import { IOtpService } from "../../domain/services/otp.service";
import { IPasswordService } from "../../domain/services/password.service";

export class SignUpUseCase implements ISignUpUseCase{
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _verificationRepository: IVerificationRepository,
        private readonly _otpService: IOtpService,
        private readonly _passwordService: IPasswordService,
        private readonly _emailService: IEmailService
    ){}

    async execute(dto: SignUpDTO): Promise<void> {
        
        const existingUser = await this._userRepository.findByEmail(dto.email);
        if (existingUser) { 
            throw new Error("User already exists with this email");
        }

        const otp = await this._otpService.generate();
        const passwordHash = await this._passwordService.hash(dto.password);

        const registrationData = {
            email: dto.email,
            otp: otp,
            payload: {
                name: dto.name,
                passwordHash: passwordHash
            }
        };

        // save temp data with otp for validation
        await this._verificationRepository.savePending(registrationData);

        await this._emailService.sendOtpEmail(dto.email, otp);
    }
}