import z from "zod";
import { emailValidator, LoginPassValidator, nameValidator, otpValidator, passwordValidator } from "../../../../common/validator/validator.schema";

export const SignupRequestSchema = z.object({
  name: nameValidator,
  email: emailValidator,
  password: passwordValidator
});

export const VerifyOtpRequestSchema = z.object({
  email:emailValidator,
  otp: otpValidator
});

export const ResendOtpRequestSchema = z.object({
  email: emailValidator
});

export const LoginRequestSchema = z.object({
  email: emailValidator,
  password:LoginPassValidator
});