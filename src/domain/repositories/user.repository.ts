import { PendingUserRegistration } from "../../application/dto/auth/signup.dto";
import { User } from "../entities/user";

export interface IUserRepository{
    findByEmail(email: string): Promise<User | null>
    savePending(data: PendingUserRegistration): Promise<void>;
}