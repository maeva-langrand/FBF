import { Router } from "express";
export const themeRouter = Router();
import { themesPage, themeEditPage, themeAddNewPage } from "../controllers/theme-controller.js";
import { adminOnly } from "../controllers/admin-controller.js";

themeRouter.get("/themes", themesPage);

themeRouter.get("/themes/editer/:id", adminOnly, themeEditPage );

themeRouter.get("/themes/nouveau-theme", adminOnly, themeAddNewPage );


