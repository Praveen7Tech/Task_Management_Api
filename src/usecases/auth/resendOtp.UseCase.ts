import { email } from "zod";
import { ResendOtpRequestDTO } from "../../application/dto/auth/verify-otp.dto"
import { IResendOtpUseCase } from "../../application/interfaces/usecase/resendOtp.usecase.interface"
import { IVerificationRepository } from "../../domain/repositories/verification.repository"
import { IEmailService } from "../../domain/services/email.service";
import { IOtpService } from "../../domain/services/otp.service";


export class ResendOtpUseCase implements IResendOtpUseCase {
    constructor(
        private readonly _verificationRepository: IVerificationRepository,
        private readonly _otpService: IOtpService,
        private readonly _emailService: IEmailService
    ){}

    async execute(request: ResendOtpRequestDTO) : Promise<void>{
        const existOtp = await this._verificationRepository.findPendingByEmail(request.email)
        if (!existOtp) {
            throw new Error("Verification session expired. Please sign up again.");
        }

        const newOtp = await this._otpService.generate()
    
         const updatedData = {
            email: existOtp.email,
            otp: newOtp,
            payload: existOtp.payload
        };
        
        await this._verificationRepository.savePending(updatedData);
        await this._emailService.sendOtpEmail(existOtp.email, newOtp)

    }
}