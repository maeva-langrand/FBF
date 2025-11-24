import { Router } from "express";
export const adminRouter = Router();
import { adminConnexion, adminDeconnexion, connexionPage } from "../controllers/admin-controller.js";

adminRouter.get("/connexion", connexionPage);

adminRouter.post("/connexion", adminConnexion);

adminRouter.get("/deconnexion", adminDeconnexion);