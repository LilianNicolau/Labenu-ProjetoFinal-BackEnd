import { GenreDatabase } from "../data/GenreDatabase";
import { Genre } from "./entities/Genre";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class GenreBusiness {
   
    async createGenre(genre: string, token: string): Promise <void> {
        try {
            if(!genre) {
                throw new CustomError(417, "Invalid genre. Please, enter genre")
            }

            const idGenerator =  new IdGenerator();
            const id = idGenerator.generate();

            const authenticator = new Authenticator();
            const verifiedToken = authenticator.getData(token);

            if (!verifiedToken) {
                throw new CustomError(401, "Please, log in");
            }

            const genreDatabase = new GenreDatabase();
            await genreDatabase.createGenre(id,genre);

        } catch (error) {
        throw new CustomError(400, error.sqlMessage || error.message);
    }
}

async getGenre(token: string): Promise <Genre[]> {
    try {
        const authenticator = new Authenticator()
        const verifiedToken = authenticator.getData(token);
        
        if(!verifiedToken) {
            throw new CustomError(401, "Unauthorized")
        }

        const genreDatabase = new GenreDatabase();

        const genres: Genre[] = await genreDatabase.getGenre()
        
        return genres

    } catch (error) {
        throw new CustomError(404, error.sqlMessage || error.message);
    }
}
}