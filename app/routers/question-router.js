import { Router } from "express";
export const questionRouter = Router();
import { questionsPage, questionEditPage, questionAddNewPage } from "../controllers/question-controller.js";
import { adminOnly } from "../controllers/admin-controller.js";


questionRouter.get("/questions", questionsPage);

questionRouter.get("/questions/editer/:id", adminOnly, questionEditPage); 

questionRouter.get("/questions/nouvelle-question", adminOnly, questionAddNewPage); 

