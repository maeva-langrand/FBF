// question-controller.js
import { findAllQuestions, findQuestionById, createQuestion, updateQuestion, deleteQuestionById } from "../datamappers/question-datamapper.js";
import { findAllThemes } from "../datamappers/theme-datamapper.js";

/* PAGE : toutes les questions */
export async function questionsPage(req, res) {
    try {
        const questions = await findAllQuestions();
        const themes = await findAllThemes();

        const themesAndQuestions = themes.map(theme => ({
            ...theme,
            questions: questions.filter(q => q.theme === theme.id)
        }));

        res.render("questions", {
            themesAndQuestions,
            pagetitle: "| Toutes les questions",
            css: "theme.css"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

/* PAGE : éditer une question */
export async function questionEditPage(req, res) {
    try {
        const questionId = parseInt(req.params.id);
        const question = await findQuestionById(questionId);
        const themes = await findAllThemes();

        if (!question) return res.status(404).send("Question non trouvée");

        res.render("question", {
            question,
            themes,
            mode: "edit",
            pagetitle: "| Éditer la question",
            css: "theme.css"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

/* PAGE : créer une nouvelle question */
export async function questionAddNewPage(req, res) {
    try {
        const themes = await findAllThemes();
        const emptyQuestion = {
            id: null,
            question: "",
            response: "",
            theme: "",
            question_image: null
        };

        res.render("question", {
            question: emptyQuestion,
            themes,
            mode: "create",
            pagetitle: "| Ajouter une question",
            css: "theme.css"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

/* CREER une question */
export async function questionCreate(req, res) {
    try {
        const { questionText, response, theme } = req.body;
        const question_image = req.file ? req.file.filename : null;

        if (!questionText || !response || !theme) {
            return res.status(400).send("Veuillez remplir tous les champs obligatoires");
        }

        await createQuestion({
            question: questionText,
            response,
            theme: parseInt(theme),
            question_image
        });

        res.redirect("/questions");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

/* EDITER une question */
export async function questionEditExisting(req, res) {
    try {
        const questionId = parseInt(req.params.id);
        const existingQuestion = await findQuestionById(questionId);

        if (!existingQuestion) return res.status(404).send("Question non trouvée");

        const { questionText, response, theme, deleteImage } = req.body;
        let question_image;

        if (deleteImage === "true") question_image = null;
        else if (req.file) question_image = req.file.filename;
        else question_image = existingQuestion.question_image;

        if (!questionText || !response || !theme) {
            return res.status(400).send("Veuillez remplir tous les champs obligatoires");
        }

        const questionClean = questionText?.trim();
        const responseClean = response?.trim();
        const themeId = parseInt(theme);

        if (!questionClean || !responseClean || !themeId) {
            return res.status(400).send("Veuillez remplir tous les champs obligatoires");
        }

        await updateQuestion(questionId, {
            question: questionClean,
            response: responseClean,
            theme: themeId,
            question_image
        });

        res.redirect("/questions");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

/* SUPPRIMER une question */
export async function questionDelete(req, res) {
    try {
        const questionId = parseInt(req.params.id);
        await deleteQuestionById(questionId);
        res.redirect("/questions");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}
