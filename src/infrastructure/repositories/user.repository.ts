import { PendingUserRegistration } from "../../application/dto/auth/signup.dto";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../database/mappers/user.mapper";
import { PendingUserModel } from "../database/models/pending.user.model";
import { UserModel } from "../database/models/user.model";

export class UserRepository implements IUserRepository{
    constructor(){}

    async findByEmail(email: string): Promise<User | null> {
        const doc = await UserModel.findOne({ email }).exec();

        if (!doc) return null;

        return UserMapper.toDomain(doc);
    }

    async savePending(data: PendingUserRegistration): Promise<void> {
        await PendingUserModel.findOneAndUpdate(
            { email: data.email },
            { 
                email: data.email,
                otp: data.otp,
                payload: data.payload, 
                otpGeneratedAt: new Date(),
                createdAt: new Date() 
            },
            { upsert: true }
        );
    }
}