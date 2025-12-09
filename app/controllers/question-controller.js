import { findAllQuestions, findQuestionById, createQuestion, updateQuestion, deleteQuestionById } from "../datamappers/question-datamapper.js";
import { findAllThemes } from "../datamappers/theme-datamapper.js";
import { getYouTubeId } from "../helpers/youtube-helper.js";

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
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de récupérer les questions",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}

/* PAGE : éditer une question */
export async function questionEditPage(req, res) {
    try {
        const questionId = parseInt(req.params.id);
        const question = await findQuestionById(questionId);
        const themes = await findAllThemes();

           if (!question) {
            return res.status(404).render("error", {
                status: 404,
                message: "Question non trouvée",
                pagetitle: "| Question introuvable",
                css: "theme.css"
            });       }

        res.render("question", {
            question,
            themes,
            mode: "edit",
            getYouTubeId,
            pagetitle: "| Éditer la question",
            css: "theme.css"
        });
 } catch (err) {
        console.error(err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de charger la page d'édition",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
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
            question_image: null,
            response_image: null,
            youtube_url: null,
            youtube_start: null,
            youtube_end: null
        };

        res.render("question", {
            question: emptyQuestion,
            themes,
            mode: "create",
            getYouTubeId,
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
        const { questionText, response, theme, youtubeUrl, youtubeStart, youtubeEnd } = req.body;

        const question_image = req.files?.questionImage?.[0]?.filename || null;
        const response_image = req.files?.responseImage?.[0]?.filename || null;

        if (!questionText || !response || !theme) {
            return res.status(400).render("error", {
                status: 400,
                message: "Veuillez remplir tous les champs obligatoires",
                pagetitle: "| Erreur formulaire",
                css: "theme.css"
            });
        }

        await createQuestion({
            question: questionText.trim(),
            response: response.trim(),
            theme: parseInt(theme),
            question_image,
            response_image,
            youtube_url: youtubeUrl || null,
            youtube_start: youtubeStart ? parseInt(youtubeStart) : null,
            youtube_end: youtubeEnd ? parseInt(youtubeEnd) : null
        });

        res.redirect("/questions");

   } catch (err) {
        console.error(err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de créer la question",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}

/* EDITER une question */
export async function questionEditExisting(req, res) {
    try {
        const questionId = parseInt(req.params.id);
        const existingQuestion = await findQuestionById(questionId);

        if (!existingQuestion) return res.status(404).send("Question non trouvée");

        const {
            questionText,
            response,
            theme,
            youtubeUrl,
            youtubeStart,
            youtubeEnd,
            deleteQuestionImage,
            deleteResponseImage,
            deleteAudio
        } = req.body;

        // IMAGE QUESTION
        let question_image = existingQuestion.question_image;
        if (deleteQuestionImage === "true") question_image = null;
        else if (req.files?.questionImage?.[0]) question_image = req.files.questionImage[0].filename;

        // IMAGE REPONSE
        let response_image = existingQuestion.response_image;
        if (deleteResponseImage === "true") response_image = null;
        else if (req.files?.responseImage?.[0]) response_image = req.files.responseImage[0].filename;

        // AUDIO YOUTUBE
        let youtube_url = existingQuestion.youtube_url;
        let youtube_start = existingQuestion.youtube_start;
        let youtube_end = existingQuestion.youtube_end;

        if (deleteAudio === "true") {
            youtube_url = null;
            youtube_start = null;
            youtube_end = null;
        } else {
            youtube_url = youtubeUrl || null;
            youtube_start = youtubeStart ? parseInt(youtubeStart) : null;
            youtube_end = youtubeEnd ? parseInt(youtubeEnd) : null;
        }

        if (!questionText || !response || !theme) {
            return res.status(400).send("Veuillez remplir tous les champs obligatoires");
        }

        await updateQuestion(questionId, {
            question: questionText.trim(),
            response: response.trim(),
            theme: parseInt(theme),
            question_image,
            response_image,
            youtube_url,
            youtube_start,
            youtube_end
        });

        res.redirect("/questions");

    } catch (err) {
        console.error(err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible d'éditer la question",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
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
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de supprimer la question",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}


