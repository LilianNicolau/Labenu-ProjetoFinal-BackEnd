import { BaseDatabase } from "./BaseDatabase";
import { User } from "../business/entities/User";
import { CustomError } from "../business/error/CustomError";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabeMusic_User";

    private static toUserModel = (obj:any): User => {
        return obj && new User(
            obj.id,
            obj.name,
            obj.email,
            obj.nickname,
            obj.password
        );
    }

    public async createUser (
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string
    ): Promise <void> {
        try {
            await BaseDatabase.connection
            .insert ({
                id,
                name,
                email,
                nickname,
                password
            }).into (UserDatabase.TABLE_NAME);
                      
        } catch (error) {
            throw new CustomError (500, error.sqlMessage || error.message);
        }
    }

    public async getUserByEmail(email:string): Promise <User> {
        try{
            const result = await BaseDatabase.connection
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where ({ email });
                
            return UserDatabase.toUserModel(result[0]);
            
        } catch (error) {
            throw new CustomError(500, error.sqlMessage || error.message);
        }
    }

    public async getUserById(id:string): Promise <User> {
        try{
            const result = await BaseDatabase.connection
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where ({ id });
                
            return UserDatabase.toUserModel(result[0]);
            
        } catch (error) {
            throw new CustomError(500, error.sqlMessage || error.message);
        }
    }
}