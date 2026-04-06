
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../database/mappers/user.mapper";
import { UserModel } from "../database/models/user.model";

export class UserRepository implements IUserRepository{
    constructor(){}

    async findByEmail(email: string): Promise<User | null> {
        const doc = await UserModel.findOne({ email }).exec();

        if (!doc) return null;

        return UserMapper.toDomain(doc);
    }

    async create(data: Partial<User>): Promise<void> {
        const user = new UserModel(data);

        await user.save();
    }

    async findById(id: string): Promise<User | null> {
        return UserModel.findById(id)
    }
}