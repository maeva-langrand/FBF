// l'application
import "dotenv/config";
import path from "node:path";
import express from "express";
import session from "express-session";
import multer from "multer";

import { themeRouter } from "./app/routers/theme-router.js";
import { questionRouter } from "./app/routers/question-router.js";
import { adminRouter } from "./app/routers/admin-router.js";


const app = express();
const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

// moteur de vue
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app/views"));

// les statics
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: false,
  maxAge: 1000 * 60 * 60 * 12,
}
}));

app.use((req, res, next) => {
  res.locals.admin = req.session.admin || null;
  next();
});

// middleware pour parser les body
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", {
    pagetitle: "| Accueil",
  });
});

app.use(themeRouter);
app.use(questionRouter);
app.use(adminRouter);


// middleware de gestion d'erreur 500 global
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Erreur serveur interne... veuillez reessayer plus tard...");
  next;
});


app.listen(port, () => {
  console.log(`✨ FBF est prêt à l'adresse http://localhost:${port}`);
});