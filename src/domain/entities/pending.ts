

export interface PayLoad{
    name: string;
    passwordHash: string;
}
export class Verification {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly otp: string,
        public readonly otpGeneratedAt: Date,
        public readonly payload: PayLoad
    ) {}
}
