import themes from "./../data/themes.json" with { type:"json" };
import fs from "fs";
import path from "path";

const themesPath = path.join(process.cwd(), "app/data/themes.json");

export function themesPage (req, res) {
  res.render("themes", { 
  themes, 
  pagetitle: "| Tous les thèmes",
  css: "theme.css"
});
};


/* EDITER UN THEME */
export function themeEditPage(req, res) {
    const themeId = parseInt(req.params.id);

    const themes = JSON.parse(fs.readFileSync(themesPath));
    const theme = themes.find(t => t.id === themeId);

    if (!theme) return res.status(404).send("Thème non trouvé");

    res.render("theme", {
        theme,
        mode: "edit",
        pagetitle: "| Éditer un thème",
        css: "theme.css"
    });
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