import { findThemeById, updateTheme, findAllThemes } from "../datamappers/theme-datamapper.js";
import { archiveQuestionsByTheme, findAllQuestions } from "../datamappers/question-datamapper.js";
import { findAllArchivedGames } from "../datamappers/game-datamapper.js";

// Fonction qui renvoie directement la vue avec toutes les archives
export async function archivesPage(req, res) {
  try {
    // --- Parties jouées ---
    const games = await findAllArchivedGames();

    // --- Thèmes et questions archivés ---
    const themes = await findAllThemes(false);
    const archivedThemes = themes.filter(t => t.archived);

    const questions = await findAllQuestions(false);
    const archivedQuestions = questions.filter(q => q.archived);

    const themesAndQuestions = archivedThemes.map(theme => ({
      ...theme,
      questions: archivedQuestions.filter(q => q.theme === theme.id)
    }));

    res.render("archives", {
      pagetitle: "| Archives",
      games,
      themesAndQuestions,
      admin: req.session.admin || null,
      css: "archives.css"
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};



// ARCHIVER LE THEME



export async function themeArchiveToggle(req, res) {
    const themeId = parseInt(req.params.id);
    const theme = await findThemeById(themeId);
    if (!theme) return res.status(404).send("Thème non trouvé");

    const newArchivedStatus = !theme.archived;

await updateTheme(themeId, { archived: newArchivedStatus });
    await archiveQuestionsByTheme(themeId, newArchivedStatus); // fonction à créer dans question-datamapper.js

    res.redirect("/");
}

