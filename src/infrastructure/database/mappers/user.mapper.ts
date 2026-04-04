import { User } from "../../../domain/entities/user";
import { IUserDocument } from "../models/user.model";

export class UserMapper {
    static toDomain(doc: IUserDocument): User {
        return new User(
            doc._id.toString(),  
            doc.name,
            doc.email,
            doc.password
        );
    }
}