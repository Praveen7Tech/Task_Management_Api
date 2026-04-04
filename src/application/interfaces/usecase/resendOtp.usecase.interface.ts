import { ResendOtpRequestDTO } from "../../dto/auth/verify-otp.dto";

export interface IResendOtpUseCase {
    execute(request: ResendOtpRequestDTO): Promise<void>;
}