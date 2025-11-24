import { findAllThemes, findThemeById, createTheme, updateTheme } from "../datamappers/datamapper.js";

export async function themesPage (req, res) {
    const themes = await findAllThemes();
  res.render("themes", { 
  themes, 
  pagetitle: "| Tous les thèmes",
  css: "theme.css"
});
};


/* EDITER UN THEME */
export async function themeEditPage(req, res) {
    const themeId = parseInt(req.params.id);


try {
    const theme = await findThemeById(themeId);
    if (!theme) {
        return res.status(404).send("Thème non trouvé");}

    res.render("theme", {
        theme,
        mode: "edit",
        pagetitle: "| Éditer un thème",
        css: "theme.css"
    });
} catch (err) {
    console.error("Erreur dans themeEdithPage :", err)
    res.status(500).send("Erreur serveur");
}
}

/* CREER UN THEME */
export function themeAddNewPage(req, res) {
    const emptyTheme = {
        id: null,
        theme_name: "",
        slug: "",
        color: "#000000",
        image: null
    };

    res.render("theme", {
        theme: emptyTheme,
        mode: "create",
        pagetitle: "| Ajouter un thème",
        css: "theme.css"
    });
}

export async function themeCreateNewTheme(req, res) {
    try {
      const { theme_name, slug, color, image } = req.body;
    
      const newTheme = await createTheme({
      theme_name,
      slug,
      color,
      theme_image: image || null
    });


    res.redirect("/themes");
  } catch (err) {
    console.error("Erreur lors de la création du thème :", err);
    res.status(500).send("Erreur serveur");
  }
}