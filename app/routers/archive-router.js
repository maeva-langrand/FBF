import { Router } from "express";
import { adminOnly } from "../controllers/admin-controller.js";
import { themeArchiveToggle, archivesPage } from "../controllers/archive-controller.js";


export const archiveRouter = Router();

archiveRouter.get("/archives", archivesPage);

// Route d'archivage / désarchivage d'un thème
archiveRouter.post("/themes/archive/:id", adminOnly, themeArchiveToggle);