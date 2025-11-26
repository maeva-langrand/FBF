import { Router } from "express";
export const archiveRouter = Router();

archiveRouter.get("/archives", (req, res) => {
  res.render("archives", {
    pagetitle: "| Archives",
  });
});