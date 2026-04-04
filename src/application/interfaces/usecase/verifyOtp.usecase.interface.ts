import { VerifyOtpRequestDTO } from "../../dto/auth/verify-otp.dto";

export interface IVerifyOtpUsecase {
  execute(request: VerifyOtpRequestDTO): Promise<void>;
}