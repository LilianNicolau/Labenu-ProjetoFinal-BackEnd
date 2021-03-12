import { GenreDatabase } from "../data/GenreDatabase";
import { SongDatabase } from "../data/SongDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Genre } from "./entities/Genre";
import { Song, SongInputDTO } from "./entities/Song";
import { CustomError } from "./error/CustomError";
import { GenreBusiness } from "./GenreBusiness";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";
import moment from "moment";

export class SongBusiness {

  async createSong (song: SongInputDTO, token: string): Promise<void> {

        try{
        
        if(!song.title || !song.author || !song.file || !song.genre || !song.album) {
            throw new CustomError(204, "Please, enter the information required")
        }
       
        const authenticator = new Authenticator()
        const verifiedToken = authenticator.getData(token);
        
        if(!verifiedToken) {
            throw new CustomError(401, "Unauthorized")
        }

        const genreBusiness = new GenreBusiness()

        const existingGenres = await genreBusiness.getGenre(token)

        const checkedGenres = existingGenres.filter((genre: Genre) => {
            return song.genre.includes(genre.genre)
        });

        if(checkedGenres.length>1) {
            throw new CustomError(409, "Genre must exist")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
        const userDatabase = new UserDatabase
        const user_id =  await userDatabase.getUserById((verifiedToken).id);
        
        const creationDate = Date.now()
        const date = moment(creationDate).format('DD//MM/YYYY');

        const songs: Song = {
            id,
            title: song.title,
            author: song.author,
            date,
            file: song.file,
            genre: checkedGenres,
            album: song.album,
            user_id: user_id.id
        }   
       
        const songDatabase = new SongDatabase();

        await songDatabase.createSong(songs)
        
    } catch (error) {
        throw new CustomError(400, error.sqlMessage || error.message)
    }

    }
}
