import { Genre } from "../business/entities/Genre";
import { Song } from "../business/entities/Song";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "./BaseDatabase";

export class SongDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabeMusic_Song";
    private static INTER_TABLE_NAME = "LabeMusic_Song_Genre";

    public async createSong (song: Song)       
    : Promise <void> {
        try {
        await BaseDatabase.connection
        .insert ({
            id: song.id,
            title: song.title,
            author: song.author,
            date: song.date,
            file: song.file,
            album: song.album,
            user_id: song.user_id,
            
        }).into (SongDatabase.TABLE_NAME);

        if(song.genre){
            for(let genres of song.genre) {
                await BaseDatabase.connection()
                .insert({song_id: song.id, genre_id: genres.id})
                .into(SongDatabase.INTER_TABLE_NAME)
            }
        } 
                  
    } catch (error) {
        throw new CustomError (500, error.sqlMessage || error.message);
        }
    }
}