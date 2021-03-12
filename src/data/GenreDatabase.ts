import { Genre } from "../business/entities/Genre";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabeMusic_Genre";

    public async createGenre(id: string, genre: string): Promise <void> {
        try {
            await BaseDatabase.connection
            .insert({
                id,
                genre
            }).into(GenreDatabase.TABLE_NAME);

        }catch (error){
            console.log(error.message)
            throw new CustomError (500, error.sqlMessage || error.message);
    }
}

public async getGenre(): Promise<Genre[]> {
    try {
        const result = await BaseDatabase.connection()
        .select("*")
        .from(GenreDatabase.TABLE_NAME);

        const genres: Genre[] = [];

        for (let genre of result) {
            genres.push({
                id: genre.id,
                genre: genre.genre
            })
        }
        return genres

    } catch (error) {
        throw new CustomError (500, error.sqlMessage || error.message);
    }
}
}
