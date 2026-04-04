import { LoginRequestDTO, LoginResponseDTO } from "../../dto/auth/verify-otp.dto";

export interface ILoginUsecase {
    execute(request: LoginRequestDTO): Promise<LoginResponseDTO>;
}