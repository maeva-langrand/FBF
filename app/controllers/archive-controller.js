import { findThemeById, updateTheme, findAllThemes } from "../datamappers/theme-datamapper.js";
import { archiveQuestionsByTheme, findAllQuestions } from "../datamappers/question-datamapper.js";

// Fonction qui renvoie directement la vue avec toutes les archives
export async function archivesPage(req, res) {
  try {
    // Section 1 : Parties jouées (placeholder pour l'instant)
    const games = [
      { name: "Partie du 1er décembre", date: "2025-12-01", participants: "Alice, Bob" },
      { name: "Partie du 30 novembre", date: "2025-11-30", participants: "Charlie, Eve" }
    ];

    // Section 2 : Thèmes et questions archivés
    const themes = await findAllThemes(false); // inclure les archivés
    const archivedThemes = themes.filter(t => t.archived);

    const questions = await findAllQuestions(false);
    const archivedQuestions = questions.filter(q => q.archived);

    const themesAndQuestions = archivedThemes.map(theme => ({
      ...theme,
      questions: archivedQuestions.filter(q => q.theme === theme.id)
    }));

    // Rendu de la vue
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

    res.redirect("/themes/editer/" + themeId);
}

