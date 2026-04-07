import { LoginRequestDTO, LoginResponseDTO } from "../../application/dto/auth/verify-otp.dto";
import { ILoginUsecase } from "../../application/interfaces/usecase/login.usecase.interface";
import { BadRequestError, NotFoundError } from "../../common/errors/common.error";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { IPasswordService } from "../../domain/services/password.service";
import { ITokenService } from "../../domain/services/token.service";

export class LoginUseCase implements ILoginUsecase{
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _passwordService: IPasswordService,
        private readonly _tokenService: ITokenService
    ){}

    async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
        
        const user = await this._userRepository.findByEmail(request.email)
        if(!user){
            throw new NotFoundError("User not found.!")
        }

        const password = await this._passwordService.compare(request.password, user.password)
        if(!password){
            throw new BadRequestError("Invalid user credentials.!")
        }

        const payload = {id: user.id, email: user.email,}
        const accessToken = await this._tokenService.generateAccessToken(payload)
        const refreshToken = await this._tokenService.generateRefressToken(payload)

        const userData ={
            id: user.id,
            name: user.name,
            email: user.email
        }

        return {
            user:userData,
            accessToken,
            refreshToken
        }
    }
}