import { SignUpDTO } from "../../dto/auth/signup.dto";

export interface ISignUpUseCase{
    execute(dto: SignUpDTO): Promise<void>
}