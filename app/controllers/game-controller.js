import { gameDatamapper } from "../datamappers/game-datamapper.js";
import { findAllThemes } from "../datamappers/theme-datamapper.js";
import { findAllQuestions } from "../datamappers/question-datamapper.js";

// Page formulaire pour configurer la partie
export async function newGamePage(req, res) {
  const themes = await findAllThemes();
  res.render("new-game", { themes, css:"new-game.css" });
}

// Démarrer la partie
export async function startGame(req, res) {

  const {
    gameName,
    players,
    totalQuestions,
    questionsPerPreferredTheme
  } = req.body;

  const questionsPerPreferred = Number(questionsPerPreferredTheme);
  const playersArray = Object.values(players);

  const allQuestions = await findAllQuestions();
  const themes = await findAllThemes();

  const cards = generateGameCards(
    playersArray,
    allQuestions,
    Number(totalQuestions),
    questionsPerPreferred
  );

  const cardsWithThemeColor = cards.map(card => {
    const theme = themes.find(t => t.id === card.theme);
    return { ...card, theme_color: theme?.color || "#ccc" };
  });

  res.render("game-grid", {
    game: {
      name: gameName,
      themes,
      players: playersArray,
      cards: cardsWithThemeColor,
      currentPlayerIndex: 0
    },
    themes,
    css: "game.css"
  });
}


// Génération stricte des cartes
function generateGameCards(players, allQuestions, totalQuestions, questionsPerPreferred) {

  // -------------------
  // VALIDATIONS
  // -------------------

  // Thèmes préférés uniques
  const preferredThemeIds = players.map(p => Number(p.theme));

  if (new Set(preferredThemeIds).size !== preferredThemeIds.length) {
    throw new Error("Deux joueurs ne peuvent pas avoir le même thème préféré.");
  }

  const requiredPreferredTotal = players.length * questionsPerPreferred;

  if (requiredPreferredTotal > totalQuestions) {
    throw new Error("Plus de questions préférées demandées que le total de questions.");
  }

  // -------------------
  // 1️⃣ QUESTIONS PRÉFÉRÉES
  // -------------------

  const cards = [];
  const usedIds = new Set();

  players.forEach(player => {

    const themeId = Number(player.theme);

    const available = allQuestions.filter(q =>
      Number(q.theme) === themeId &&
      !usedIds.has(q.id)
    );

    if (available.length < questionsPerPreferred) {
      throw new Error(
        `Pas assez de questions pour le thème préféré du joueur "${player.name}". ` +
        `Demandé: ${questionsPerPreferred}, disponible: ${available.length}`
      );
    }

    const selected = available
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsPerPreferred);

    selected.forEach(q => {
      cards.push({ ...q, answeredBy: null });
      usedIds.add(q.id);
    });
  });

  // -------------------
  // 2️⃣ COMPLÉTION AVEC
  //    UNIQUEMENT LES
  //    THÈMES NON-PRÉFÉRÉS
  // -------------------

  const remainingNeeded = totalQuestions - cards.length;

  const remainingPool = allQuestions.filter(q =>
    !usedIds.has(q.id) &&
    !preferredThemeIds.includes(Number(q.theme)) // ⚡ STRICTEMENT NON-PRÉFÉRÉ
  );

  if (remainingPool.length < remainingNeeded) {
    throw new Error(
      `Pas assez de questions provenant des thèmes non-préférés.` +
      ` Demandé: ${remainingNeeded}, disponibles: ${remainingPool.length}`
    );
  }

  const supplement = remainingPool
    .sort(() => Math.random() - 0.5)
    .slice(0, remainingNeeded);

  supplement.forEach(q => {
    cards.push({ ...q, answeredBy: null });
    usedIds.add(q.id);
  });

  // -------------------
  // 3️⃣ MÉLANGE FINAL
  // -------------------

  return cards
    .sort(() => Math.random() - 0.5)
    .map((q, index) => ({
      ...q,
      number: index + 1,
      played: false
    }));
}


