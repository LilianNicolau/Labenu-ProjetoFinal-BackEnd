import express from "express";
import { SongController } from "../SongController";

export const songRouter = express.Router();

const songController = new SongController();

songRouter.post("/create", songController.createSong)

