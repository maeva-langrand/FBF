import { Router } from "express";
export const questionRouter = Router();
import { questionsPage, questionEditPage, questionAddNewPage } from "../controllers/question-controller.js";


questionRouter.get("/questions", questionsPage);

questionRouter.get("/questions/editer/:id", questionEditPage); 

questionRouter.get("/questions/nouvelle-question", questionAddNewPage); 

