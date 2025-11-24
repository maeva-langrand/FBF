import { Router } from "express";
import { upload } from "../config/multer-config.js";
import { themesPage, themeEditPage, themeEditExisting, themeAddNewPage, themeCreateNewTheme } from "../controllers/theme-controller.js";
import { adminOnly } from "../controllers/admin-controller.js";

export const themeRouter = Router();

themeRouter.get("/themes", themesPage);

themeRouter.get("/themes/editer/:id", adminOnly, themeEditPage );

themeRouter.get("/themes/nouveau-theme", adminOnly, themeAddNewPage );

themeRouter.post("/themes/nouveau-theme", adminOnly, upload.single("theme_image"), themeCreateNewTheme );

themeRouter.post("/themes/editer/:id", adminOnly, upload.single("theme_image"), themeEditExisting);


