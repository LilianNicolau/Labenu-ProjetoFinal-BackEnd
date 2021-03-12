import { Genre } from "./Genre";

export class Song {
    constructor (
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: string,
        public readonly file: string,
        public readonly album: string,
        public readonly user_id: string,
        public readonly genre?: Genre[]
    ) {}
}

export interface SongInputDTO {
    title: string,
    author: string,
    file: string,
    genre: string[],
    album: string,
}
