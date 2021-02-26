import { UserDatabase } from "../data/UserDatabase";
import { UserInputDTO } from "./entities/User";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private userDatabase: UserDatabase
    ) {}

    async createUser(user: UserInputDTO) {
        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(
            id,
            user.name,
            user.email,
            user.nickname,
            hashPassword
        );

        const accessToken = this.authenticator.generateToken({
            id
        });

        return accessToken
    }
}