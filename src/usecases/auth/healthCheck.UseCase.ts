import { AuthStatusRequestDTO, LoginResponseDTO } from "../../application/dto/auth/verify-otp.dto";
import { IHealthCheckUseCase } from "../../application/interfaces/usecase/health.check.usecase.interface";
import { BadRequestError } from "../../common/errors/common.error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { ITokenService } from "../../domain/services/token.service";

export class HealthCheckUseCase implements IHealthCheckUseCase{
    constructor(
        private readonly _tokenService: ITokenService,
        private readonly _userRepository: IUserRepository
    ){}

    async execute(request: AuthStatusRequestDTO): Promise<LoginResponseDTO> {
        const payload = await this._tokenService.verifyRefreshToken(request.refreshToken);
        if (!payload) {
            throw new BadRequestError("Invalid refresh token");
        }

        let userData = await this._userRepository.findById(payload.id)
         if (!userData || !userData.id) {
            throw new BadRequestError("User not found using refresh token");
        }

        const payloadTkn = { id: userData.id.toString(), email: userData.email };
        const newAccessToken = await this._tokenService.generateAccessToken(payloadTkn);
        const newRefreshToken = await this._tokenService.generateRefressToken(payloadTkn)

        return {
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email
            },
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }
    }
}