import { findAllThemes } from "../datamappers/theme-datamapper.js";
import { findAllQuestions } from "../datamappers/question-datamapper.js";

// Page formulaire pour configurer la partie
export async function newGamePage(req, res) {
  const themes = await findAllThemes();
  res.render("new-game", { themes });
}

// Génération de la partie
export async function startGame(req, res) {
  const { gameName, players, totalQuestions } = req.body;

  // Récupérer toutes les questions et tous les thèmes
  const allQuestions = await findAllQuestions();
  const themes = await findAllThemes();

  // Générer les cartes selon les préférences des joueurs
  const cards = generateGameCards(players, allQuestions, parseInt(totalQuestions));

  // Ajouter la couleur de thème à chaque carte pour l'affichage
  const cardsWithThemeColor = cards.map(card => {
    const theme = themes.find(t => t.id === card.theme);
    return { ...card, theme_color: theme?.color || "#ccc" };
  });

  const game = {
    name: gameName,
    players,
    cards: cardsWithThemeColor,
    currentPlayerIndex: 0
  };

  // Transmettre aussi les thèmes à la vue
  res.render("game-grid", { game, themes, css:"game.css" });
}

// Utilitaire pour créer la grille
function generateGameCards(players, allQuestions, totalQuestions, questionsPerPreferred) {
  let cards = [];

  // 1️⃣ Questions préférées par joueur
  players.forEach(player => {
    const preferredQuestions = allQuestions
      .filter(q => q.theme === parseInt(player.theme))
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, questionsPerPreferred); // seulement le nombre voulu
    cards.push(...preferredQuestions);
  });

  // 2️⃣ Questions restantes non préférées
  const remainingQuestions = allQuestions.filter(q => !cards.includes(q));
  while (cards.length < totalQuestions && remainingQuestions.length > 0) {
    const index = Math.floor(Math.random() * remainingQuestions.length);
    cards.push(remainingQuestions.splice(index, 1)[0]);
  }

  // 3️⃣ Mélange final
  cards = cards.sort(() => Math.random() - 0.5);

  // 4️⃣ Ajouter numéro et info thème
  return cards.map((q, index) => ({
    ...q,
    number: index + 1,
    played: false,
    themeInfo: {
      id: q.theme,
      theme_name: q.theme_name,
      color: q.theme_color
    }
  }));
}
