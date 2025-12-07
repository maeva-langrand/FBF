import { findAllThemes } from "../datamappers/theme-datamapper.js";
import { findAllQuestions } from "../datamappers/question-datamapper.js";

// Page formulaire pour configurer la partie
export async function newGamePage(req, res) {
  const themes = await findAllThemes();
  res.render("new-game", { themes });
}

// Génération de la partie
export async function startGame(req, res) {
  const { gameName, players, totalQuestions, questionsPerPreferred } = req.body;

  // Récupérer toutes les questions et tous les thèmes
  const allQuestions = await findAllQuestions();
  const themes = await findAllThemes();

  // Générer les cartes selon les préférences des joueurs
  const cards = generateGameCards(players, allQuestions, parseInt(totalQuestions), parseInt(questionsPerPreferred));

  // Ajouter la couleur de thème à chaque carte pour l'affichage
  const cardsWithThemeColor = cards.map(card => {
    const theme = themes.find(t => t.id === card.theme);
    return { ...card, theme_color: theme?.color || "#ccc" };
  });

  const game = {
    name: gameName,
    themes,
    players,
    cards: cardsWithThemeColor,
    currentPlayerIndex: 0
  };

  res.render("game-grid", { game, themes, css: "game.css" });
}

// Utilitaire pour créer la grille de manière équilibrée
function generateGameCards(players, allQuestions, totalQuestions, questionsPerPreferred) {
  let cards = [];

  // 1️⃣ Sélection des questions préférées pour chaque joueur
  players.forEach(player => {
    const preferredQuestions = allQuestions
      .filter(q => q.theme === parseInt(player.theme))
      .sort(() => Math.random() - 0.5) // mélange
      .slice(0, questionsPerPreferred); // limite par joueur
    cards.push(...preferredQuestions);
  });

  // 2️⃣ Compléter avec les questions restantes pour atteindre le total
  const usedIds = new Set(cards.map(q => q.id));

  // Regrouper les questions restantes par thème
  const remainingByTheme = {};
  allQuestions.forEach(q => {
    if (!usedIds.has(q.id)) {
      if (!remainingByTheme[q.theme]) remainingByTheme[q.theme] = [];
      remainingByTheme[q.theme].push(q);
    }
  });

  const remainingCount = totalQuestions - cards.length;
  const remainingThemes = Object.keys(remainingByTheme).map(Number);

  let i = 0;
  while (cards.length < totalQuestions && remainingThemes.length > 0) {
    const theme = remainingThemes[i % remainingThemes.length];
    const questions = remainingByTheme[theme];
    if (questions && questions.length > 0) {
      const q = questions.pop(); // prendre une question
      cards.push(q);
      usedIds.add(q.id);
    } else {
      // retirer le thème s'il n'y a plus de questions
      remainingThemes.splice(i % remainingThemes.length, 1);
      i--; // rester sur le même index pour la prochaine boucle
    }
    i++;
  }

  // 3️⃣ Mélanger les cartes finales et numéroter
  cards = cards.sort(() => Math.random() - 0.5);
  return cards.map((q, index) => ({ ...q, number: index + 1, played: false }));
}
