
export function connexionPage (req, res) {

    res.render("connexion", {
        pagetitle: "| Connexion",
    });
};



export function adminConnexion (req, res) {
   const { username, password } =  req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.admin = true;
        return res.redirect("/");
    };

    res.render("connexion", {
        pagetitle: "| Connexion",
        error: "Identifiants incorrects"
    });
};

export function adminDeconnexion (req, res) {
    req.session.destroy(err =>{
        if (err) {
            console.error("Erreur lors de la déconnexion:", err);
            return res.redirect("/");
        }

        res.render("connexion", {
            pagetitle: " | Déconnexion",
            message: "Vous êtes bien déconnecté(e)."
        })
    })
}

export function adminOnly(req, res, next) {
  if (!req.session.admin) {
    return res.status(403).send("Accès interdit : vous n'êtes pas connecté en tant qu'administrateur.");
  }
  next();
}