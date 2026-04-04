import { IVerifyOtpUsecase } from "../../application/interfaces/usecase/verifyOtp.usecase.interface";
import { InvalidOtpError, OtpExpiredError } from "../../common/errors/common.error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IVerificationRepository } from "../../domain/repositories/verification.repository";


export class VerifyOtpUsecase implements IVerifyOtpUsecase {
    constructor(
        private readonly _verificationRepository: IVerificationRepository,
        private readonly _userRepository: IUserRepository
    ) {}

    async execute(request: { email: string; otp: string }): Promise<void> {
        const verification = await this._verificationRepository.findPendingByEmail(request.email);

        if (!verification) {
            throw new Error("Verification session expired. Please sign up again.");
        }

        if (verification.otp !== request.otp) {
            throw new InvalidOtpError();
        }

        const now = Date.now();
        const generatedAt = new Date(verification.otpGeneratedAt).getTime();
        if (now - generatedAt > 60000) { 
            throw new OtpExpiredError()
        }

        const newUser = {
           name: verification.payload.name,
           email: verification.email,
           password: verification.payload.passwordHash
        }

        await this._userRepository.create(newUser);

        //Cleanup
         await this._verificationRepository.deletePending(verification.id);
    }
}
