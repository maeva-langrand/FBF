import themes from "../data/themes.json" with { type:"json" };
import questions from "../data/questions.json" with { type:"json" };

import fs from "fs";
import path from "path";


const questionsPath = path.join(process.cwd(), "app/data/questions.json");
const themesPath = path.join(process.cwd(), "app/data/themes.json");

// PAGE : QUESTIONS
export function questionsPage(req, res) {
    const questions = JSON.parse(fs.readFileSync(questionsPath));
    const themes = JSON.parse(fs.readFileSync(themesPath));

    const themesAndQuestions = themes.map(theme => ({
        ...theme,
        questions: questions.filter(q => q.theme === theme.id)
    }));

    res.render("questions", {
        themesAndQuestions,
        pagetitle: "| Toutes les questions",
        css: "theme.css"
    });
}

// PAGE : QUESTION (éditer une question)
export function questionEditPage(req, res) {
    const questionId = parseInt(req.params.id);

    const questions = JSON.parse(fs.readFileSync(questionsPath));
    const themes = JSON.parse(fs.readFileSync(themesPath));

    const question = questions.find(q => q.id === questionId);

    if (!question) return res.status(404).send("Question non trouvée");

    res.render("question", {
        question,
        themes,
        mode: "edit",
        pagetitle: "| Éditer la question",
        css: "theme.css"
    });
}

// PAGE : QUESTION (nouvelle question)
export function questionAddNewPage(req, res) {

    const emptyQuestion = {
        id: null,
        question: "",
        response: "",
        theme: "",
        image: null
    };

    res.render("question", {
        question: emptyQuestion,
        themes,
        mode: "create",
        pagetitle: "| Ajouter une question",
        css: "theme.css"
    });
}