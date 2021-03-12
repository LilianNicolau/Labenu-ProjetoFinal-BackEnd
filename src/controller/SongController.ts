import { SongInputDTO } from "../business/entities/Song";
import { Request, Response} from "express";
import { SongBusiness } from "../business/SongBusiness";
import { CustomError } from "../business/error/CustomError";

export class SongController {
    async createSong(req: Request, res: Response) {
    try{

        const token = req.headers.authorization as string;

        const input: SongInputDTO = {
            title: req.body.title,
            author: req.body.author,
            file: req.body.file,
            genre: req.body.genre,
            album: req.body.album,
        }
      
        const songBusiness = new SongBusiness();
        await songBusiness.createSong(input, token);

      res.status(200).send({message: "Song created successsfully"});
      
    } catch (error) {
        res.status(error.code || 400).send({message: error.message});
    }
}
}
