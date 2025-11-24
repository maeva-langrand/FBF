import { Router } from "express";
export const themeRouter = Router();
import { themesPage, themeEditPage, themeAddNewPage } from "../controllers/theme-controller.js";

themeRouter.get("/themes", themesPage);

themeRouter.get("/themes/editer/:id", themeEditPage);

themeRouter.get("/themes/nouveau-theme", themeAddNewPage);


