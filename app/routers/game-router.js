import { Router } from "express";
import { newGamePage, startGame } from "../controllers/game-controller.js";

export const gameRouter = Router();


// Page de configuration de la partie
gameRouter.get("/nouvelle-partie", newGamePage);

// Démarrer la partie
gameRouter.post("/partie-en-cours", startGame);
