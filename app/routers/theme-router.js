import { Router } from "express";
export const themeRouter = Router();
import { themesPage, themeEditPage, themeAddNewPage, themeCreateNewTheme } from "../controllers/theme-controller.js";
import { adminOnly } from "../controllers/admin-controller.js";

themeRouter.get("/themes", themesPage);

themeRouter.get("/themes/editer/:id", adminOnly, themeEditPage );

themeRouter.get("/themes/nouveau-theme", adminOnly, themeAddNewPage );

themeRouter.post("/themes/nouveau-theme", adminOnly, themeCreateNewTheme );


