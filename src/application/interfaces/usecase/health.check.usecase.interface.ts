import { AuthStatusRequestDTO, LoginResponseDTO } from "../../dto/auth/verify-otp.dto";

export interface IHealthCheckUseCase {
  execute(request: AuthStatusRequestDTO): Promise<LoginResponseDTO>;
}