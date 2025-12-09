import { findAllThemes, findThemeById, createTheme, updateTheme, setThemeArchived } from "../datamappers/theme-datamapper.js";

export async function themesPage(req, res) {
    try {
        const themes = await findAllThemes();
        res.render("themes", {
            themes,
            pagetitle: "| Tous les thèmes",
            css: "theme.css"
        });
    } catch (err) {
        console.error("Erreur lors du chargement des thèmes :", err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de récupérer les thèmes",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}



/*AFFICHER LA PAGE D'EDITION */
export async function themeEditPage(req, res) {
    try {
        const themeId = parseInt(req.params.id);
        const theme = await findThemeById(themeId);

        if (!theme) {
            return res.status(404).render("error", {
                status: 404,
                message: "Thème non trouvé",
                pagetitle: "| Thème introuvable",
                css: "theme.css"
            });
        }

        res.render("theme", {
            theme,
            mode: "edit",
            pagetitle: "| Éditer un thème",
            css: "theme.css"
        });
    } catch (err) {
        console.error("Erreur lors du chargement du thème :", err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de charger la page d'édition",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}


/* EDITER UN THEME */
export async function themeEditExisting(req, res) {
    const themeId = parseInt(req.params.id);

    try {
        // Récupérer le thème existant dans la BDD
        const existingTheme = await findThemeById(themeId);
        if (!existingTheme) {
            return res.status(404).render("error", {
                status: 404,
                message: "Thème non trouvé",
                pagetitle: "| Thème introuvable",
                css: "theme.css"
            });
        }

        // Récupérer les valeurs du formulaire
        const { theme_name, slug, color, deleteImage } = req.body;

        // Gérer l'image
        let theme_image;
        if (deleteImage === "true") {
            theme_image = null; // supprimer l'image
        } else if (req.file) {
            theme_image = req.file.filename; // nouvelle image
        } else {
            theme_image = existingTheme.theme_image; // conserver l'image existante
        }

        if (!theme_name || !slug || !color) {
            return res.status(400).render("error", {
                status: 400,
                message: "Veuillez remplir tous les champs obligatoires",
                pagetitle: "| Erreur formulaire",
                css: "theme.css"
            });
        }

        const updatedTheme = await updateTheme(themeId, { theme_name, slug, color, theme_image });
        res.redirect("/themes");

    } catch (err) {
        console.error("Erreur lors de l'édition du thème :", err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible d'éditer le thème",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}

/* PAGE : CREER UN THEME */
export function themeAddNewPage(req, res) {
    const emptyTheme = {
        id: null,
        theme_name: "",
        slug: "",
        color: "#000000",
        theme_image: null
    };

    res.render("theme", {
        theme: emptyTheme,
        mode: "create",
        pagetitle: "| Ajouter un thème",
        css: "theme.css"
    });
}

/* REELLEMENT CREER UN THEME */
export async function themeCreateNewTheme(req, res) {
    try {
        const { theme_name, slug, color } = req.body;

        const theme_image = req.file ? req.file.filename : null;

        if (!theme_name || !slug || !color) {
            return res.status(400).render("error", {
                status: 400,
                message: "Veuillez remplir tous les champs obligatoires",
                pagetitle: "| Erreur formulaire",
                css: "theme.css"
            });
        }

        await createTheme({ theme_name, slug, color, theme_image });
        res.redirect("/themes");
    } catch (err) {
        console.error("Erreur lors de la création du thème :", err);
        res.status(500).render("error", {
            status: 500,
            message: "Impossible de créer le thème",
            pagetitle: "| Erreur serveur",
            css: "theme.css"
        });
    }
}

