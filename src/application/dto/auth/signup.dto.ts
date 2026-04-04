
export interface SignUpDTO{
    name: string
    email: string
    password: string
}


export interface PendingUserRegistration {
    email: string;
    otp: string;
    payload: {
        name: string;
        passwordHash: string;
    };
}