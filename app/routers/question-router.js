// question-router.js
import { Router } from "express";
import { adminOnly } from "../controllers/admin-controller.js";
import { upload } from "../config/multer-config.js";
import { questionsPage, questionEditPage, questionAddNewPage, questionCreate, questionEditExisting, questionDelete } from "../controllers/question-controller.js";

export const questionRouter = Router();

/* Afficher toutes les questions */
questionRouter.get("/questions", adminOnly, questionsPage);

/* Ajouter une nouvelle question */
questionRouter.get("/questions/nouvelle-question", adminOnly, questionAddNewPage);
questionRouter.post("/questions/nouvelle-question", adminOnly, upload.single("newImage"), questionCreate);

/* Éditer une question */
questionRouter.get("/questions/editer/:id", adminOnly, questionEditPage);
questionRouter.post("/questions/editer/:id", adminOnly, upload.single("newImage"), questionEditExisting);

/* Supprimer une question */
questionRouter.post("/questions/supprimer/:id", adminOnly, questionDelete);
