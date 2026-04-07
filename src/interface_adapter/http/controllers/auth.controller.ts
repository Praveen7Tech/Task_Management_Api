import { NextFunction, Request, Response } from "express";
import { ISignUpUseCase } from "../../../application/interfaces/usecase/auth.usecase.interface";
import { LoginRequestSchema, ResendOtpRequestSchema, SignupRequestSchema, VerifyOtpRequestSchema } from "../validators/auth/auth.validator";
import { StatusCode } from "../../../common/constants/status.enum";
import { MESSAGES } from "../../../common/constants/message";
import { IVerifyOtpUsecase } from "../../../application/interfaces/usecase/verifyOtp.usecase.interface";
import { LoginRequestDTO, ResendOtpRequestDTO, VerifyOtpRequestDTO } from "../../../application/dto/auth/verify-otp.dto";
import { IResendOtpUseCase } from "../../../application/interfaces/usecase/resendOtp.usecase.interface";
import { ILoginUsecase } from "../../../application/interfaces/usecase/login.usecase.interface";
import { COOKIE_OPTIONS } from "../../../common/cookie/cookie.option";
import { IHealthCheckUseCase } from "../../../application/interfaces/usecase/health.check.usecase.interface";

export class AuthController{
    constructor(
        private readonly _signupUsecase: ISignUpUseCase,
        private readonly _verifyOtoUseCase: IVerifyOtpUsecase,
        private readonly _resendOtpUsecase: IResendOtpUseCase,
        private readonly _loginUsecase: ILoginUsecase,
        private readonly _healthCheckUsecase: IHealthCheckUseCase
    ){}

    signup = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const data = SignupRequestSchema.parse(req.body)

            await this._signupUsecase.execute(data)

            return res.status(StatusCode.CREATED).json({message:MESSAGES.OTP_SEND});
        } catch (error) {
            next(error)
        }
    }


    verfiyOtp = async(req:Request, res:Response, next: NextFunction)=>{
        try {
            const dto: VerifyOtpRequestDTO = VerifyOtpRequestSchema.parse(req.body)

            await this._verifyOtoUseCase.execute(dto)

            return res.status(StatusCode.OK).json({message: MESSAGES.OTP_VERIFIED})
        } catch (error) {
            next(error)
        }
    }

    resendOtp = async(req: Request, res:Response, next: NextFunction)=>{
        try {
            const dto: ResendOtpRequestDTO= ResendOtpRequestSchema.parse(req.body)
            await this._resendOtpUsecase.execute(dto)
            
            return res.status(StatusCode.OK).json({message:MESSAGES.OTP_RESEND_SUCCESS})
        } catch (error) {
            next(error)
        }
    }

    login = async(req:Request, res:Response, next: NextFunction)=>{
        try {
            const dto: LoginRequestDTO= LoginRequestSchema.parse(req.body)

            const result = await this._loginUsecase.execute(dto)
            // set cookie
            res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS)
            res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

            return res.status(StatusCode.OK).json({
                message: MESSAGES.VERIFICATION_COMPLETE,
                user: result.user
            })
        } catch (error) {
            next(error)
        }
    }

    health = async(req:Request, res:Response, next: NextFunction)=>{
        try {
           const refreshToken = req.cookies?.refreshToken
            if (!refreshToken) {
                return res.status(StatusCode.OK).json({ user: null});
            }

            const result = await this._healthCheckUsecase.execute({ refreshToken });

            res.cookie('accessToken', result.accessToken, COOKIE_OPTIONS)
            res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
        
            return res.status(StatusCode.OK).json({user:result.user, accessToken:result.accessToken});
        } catch (error) {
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken");
            next(error)
        }
    }

    logout = async(req: Request, res:Response, next: NextFunction)=>{
        try {
            res.clearCookie("accessToken",COOKIE_OPTIONS)
            res.clearCookie('refreshToken',COOKIE_OPTIONS);
            return res.status(StatusCode.OK).json({message:MESSAGES.LOGOUT_SUCCESSFUL});
        } catch (error) {
            next(error)
        }
    }
}