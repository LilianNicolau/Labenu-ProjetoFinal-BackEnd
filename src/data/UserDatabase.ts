import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabeMusic_User";

    private static toUserModel (user:any): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.nickname,
            user.password
        );
    }
    public async createUser (
        id: string,
        email: string,
        name: string,
        nickname: string,
        password: string
    ): Promise <void> {
        try {
            await BaseDatabase.connection
            .insert ({
                id,
                email,
                name,
                nickname,
                password
            }).into (UserDatabase.TABLE_NAME);
        } catch (error) {
            throw new CustomError (500, "An unexpected error occurred");
        }
    }
}