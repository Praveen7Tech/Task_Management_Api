import dotenv from 'dotenv'
dotenv.config()
import { AuthPayload, ITokenService } from "../../domain/services/token.service";
import  jwt  from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET!

export class JwtTokenService implements ITokenService{

    async generateAccessToken(payload: AuthPayload ): Promise<string> {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
    }

    async verifyAccessToken(token: string): Promise<AuthPayload  | null> {
        try {
            return jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthPayload ;
        } catch (err) {
            console.error(err)
            return null;
        }
    }
}