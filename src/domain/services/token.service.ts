
export interface AuthPayload  {
    id: string
    email:string
    iat?:number
    exp?:number
}

export interface ITokenService {
    generateAccessToken(payload: AuthPayload ): Promise<string>,
    verifyAccessToken(token: string): Promise<AuthPayload  | null>,
}