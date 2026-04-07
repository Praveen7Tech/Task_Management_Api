
import { Verification } from "../../domain/entities/pending";
import { IVerificationRepository } from "../../domain/repositories/verification.repository";
import { PendingUserModel } from "../database/models/pending.user.model";

export class VerificationRepository implements IVerificationRepository {
    
    async savePending(data: Verification): Promise<void> {
        await PendingUserModel.findOneAndUpdate(
            { email: data.email },
            { 
                email: data.email,
                otp: data.otp,
                payload: data.payload,
                otpGeneratedAt: new Date(),
                createdAt: new Date() // Resets 5-min TTL
            },
            { upsert: true, new: true }
        );
    }

    async findPendingByEmail(email: string): Promise<Verification | null> {
        const doc = await PendingUserModel.findOne({ email }).lean();
        if (!doc || !doc.payload) return null;

        return new Verification(
            doc._id.toString(),
            doc.email,
            doc.otp,
            doc.otpGeneratedAt,
            doc.payload
        );
    }

    async deletePending(id: string): Promise<void> {
        await PendingUserModel.findByIdAndDelete(id)
    }
}
