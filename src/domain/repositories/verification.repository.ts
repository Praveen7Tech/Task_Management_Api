import { PendingUserRegistration } from "../../application/dto/auth/signup.dto";
import { Verification } from "../entities/pending";

export interface IVerificationRepository{
    savePending(data: PendingUserRegistration): Promise<void>;
    findPendingByEmail(email: string): Promise<Verification | null>;
    deletePending(id: string): Promise<void>
}