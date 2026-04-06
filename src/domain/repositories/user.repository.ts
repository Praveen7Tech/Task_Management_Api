import { User } from "../entities/user";

export interface IUserRepository{
    findByEmail(email: string): Promise<User | null>;
    create(data: Partial<User>): Promise<void>
    findById(id: string): Promise<User | null>
}