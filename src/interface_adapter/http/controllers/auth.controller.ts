import { NextFunction, Request, Response } from "express";
import { ISignUpUseCase } from "../../../application/interfaces/usecase/auth.usecase.interface";
import { SignupRequestSchema } from "../validators/auth/auth.validator";
import { StatusCode } from "../../../common/constants/status.enum";
import { MESSAGES } from "../../../common/constants/message";

export class AuthController{
    constructor(
        private readonly signupUsecase: ISignUpUseCase
    ){}

    signup = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            console.log('auth controller')
            const data = SignupRequestSchema.parse(req.body)

            await this.signupUsecase.execute(data)

            return res.status(StatusCode.CREATED).json({message:MESSAGES.OTP_SEND});
        } catch (error) {
            console.error(error)
        }
    }
}