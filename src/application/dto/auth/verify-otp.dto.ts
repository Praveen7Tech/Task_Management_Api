export interface VerifyOtpRequestDTO {
  email: string;
  otp: string;
}

export interface ResendOtpRequestDTO {
  email: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

interface User{
  id: string;
  name: string;
  email: string
}

export interface LoginResponseDTO{
  user:User;
  accessToken: string
}