document.addEventListener("DOMContentLoaded", async () => {
  const gameDataEl = document.getElementById("gameData");
  const game = JSON.parse(gameDataEl.dataset.game);

  // Initialisation des scores si pas déjà
  game.players.forEach(p => { if(p.score === undefined) p.score = 0; });

  const gridContainer = document.querySelector(".grid-container");
  const currentPlayerEl = document.getElementById("current-player");
  const timerEl = document.getElementById("timer");

  let timerValue = 3;
  let timerFinished = false;

  // --- TIMER ---
  const timerInterval = setInterval(() => {
    if (timerValue > 0) {
      timerValue--;
      timerEl.textContent = timerValue;
    } else if (!timerFinished) {
      timerFinished = true;
      clearInterval(timerInterval);
      document.querySelectorAll(".card").forEach(card => {
        if (!card.classList.contains("played")) {
          card.classList.add("greyed");
          card.style.backgroundColor = "#aaa";
        }
      });
      if(timerEl) timerEl.style.display = "none";
    }
  }, 1000);

  // --- GRILLE ---
  function renderGrid() {
    gridContainer.innerHTML = "";
    game.cards.forEach(card => {
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");
      cardEl.dataset.id = card.id;
      cardEl.dataset.themeColor = card.theme_color;
      cardEl.dataset.themeName = card.theme_name;
      cardEl.style.backgroundColor = card.theme_color;
      cardEl.innerHTML = `<div class="card-number">${card.number}</div>`;

      if (card.played) cardEl.classList.add("played");
      if (timerFinished && !card.played) cardEl.classList.add("greyed");

      cardEl.addEventListener("click", () => {
        if (!card.played) openCard(card, cardEl);
      });

      gridContainer.appendChild(cardEl);
    });
  }

  renderGrid();

  // --- OVERLAY ---
  const overlay = document.createElement("div");
  overlay.classList.add("card-overlay");
  overlay.style.display = "none";
  document.querySelector(".grid-wrapper").appendChild(overlay);

  let activeCardEl = null;
function openCard(card, cardEl) {
  activeCardEl = cardEl;
  overlay.style.display = "flex";

  // Overlay avec structure fixe + container pour l’audio
  overlay.innerHTML = `
    <div class="overlay-content" style="background:${card.theme_color}">
      <h2 class="theme-text">${card.theme_name}</h2>
      <p class="question-text">${card.question}</p>
      ${card.question_image ? `<img src="/uploads/${card.question_image}" style="max-width:90%; max-height:50%;">` : ""}
      <div class="audio-container"></div>
      ${card.youtube_url ? `<button class="play-audio-btn">▶️ Lancer l'extrait</button>` : ""}
      <button id="showAnswerBtn">Afficher la réponse</button>
    </div>
  `;

  const content = overlay.querySelector(".overlay-content");
  const audioContainer = content.querySelector(".audio-container");

  // --- PLAY AUDIO ---
  if (card.youtube_url) {
    const playBtn = content.querySelector(".play-audio-btn");
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
     // playBtn.remove(); // bouton disparaît
      createYoutubePlayer(audioContainer, card);
    });
  }

  // --- SHOW ANSWER ---
  document.getElementById("showAnswerBtn").addEventListener("click", () => {
    content.innerHTML = `
      <h2 class="theme-text">${card.theme_name}</h2>
      <p class="answer-text">${card.response}</p>
      ${card.response_image ? `<img src="/uploads/${card.response_image}" style="max-width:90%; max-height:50%;">` : ""}
      <div class="audio-container"></div>
      ${card.youtube_url ? `<button class="play-audio-btn">▶️ Lancer l'extrait</button>` : ""}
      <div class="thumb-buttons">
        <button id="thumbUpBtn">👍</button>
        <button id="thumbDownBtn">👎</button>
      </div>
    `;

    const answerAudioContainer = content.querySelector(".audio-container");

    if (card.youtube_url) {
      const answerPlayBtn = content.querySelector(".play-audio-btn");
      answerPlayBtn.addEventListener("click", () => {
        answerPlayBtn.remove();
        createYoutubePlayer(answerAudioContainer, card);
      });
    }

    document.getElementById("thumbUpBtn").addEventListener("click", () => finishCard(cardEl, card, true));
    document.getElementById("thumbDownBtn").addEventListener("click", () => finishCard(cardEl, card, false));
  });
}

// --- Fonction pour créer le player audio uniquement ---
function createYoutubePlayer(container, card) {
  const videoId = card.youtube_url.includes("v=")
    ? card.youtube_url.split("v=")[1].split("&")[0]
    : card.youtube_url;

  const start = card.youtube_start || 0;
  const end = card.youtube_end || "";

  const iframe = document.createElement("iframe");
  iframe.width = "0";   // on ne veut pas afficher la vidéo
  iframe.height = "0";  // juste le son
  iframe.src = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&autoplay=1&controls=0&mute=0`;
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;

  container.appendChild(iframe);
}



// Fonction helper YouTube
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&?]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Fonction pour afficher la réponse (inchangée)
function renderAnswerContent(card, container) {
  container.innerHTML = `
    <h2 class="theme-text">${card.theme_name}</h2>
    <p class="answer-text">${card.response}</p>
    ${card.response_image ? `<img src="/uploads/${card.response_image}" class="response-img">` : ""}
    <div class="thumb-buttons">
      <button id="thumbUpBtn">👍</button>
      <button id="thumbDownBtn">👎</button>
    </div>
  `;

  document.getElementById("thumbUpBtn").addEventListener("click", () => finishCard(activeCardEl, card, true));
  document.getElementById("thumbDownBtn").addEventListener("click", () => finishCard(activeCardEl, card, false));
}




  // --- FIN DE CARTE / POINTS ---
  function finishCard(cardEl, card, correct) {
    card.played = true;

    const currentPlayer = game.players[game.currentPlayerIndex];

    // Attribution des points
    let points = 0;
    if(correct) {
      if(card.theme === parseInt(currentPlayer.theme)) points = 2; // thème préféré du joueur
      else if(game.players.some(p => parseInt(p.theme) === card.theme)) points = 3; // thème préféré d’un autre
      else points = 1; // thème non préféré
    }

    currentPlayer.score += points;

    // Mise à jour visuelle de la carte
    cardEl.classList.add("played");
    cardEl.style.backgroundColor = card.theme_color;
    cardEl.style.border = `3px solid ${card.theme_color}`;
    cardEl.innerHTML = `<div class="card-number">${card.number}</div>`;

    overlay.style.display = "none";
    activeCardEl = null;

    // Joueur suivant
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    currentPlayerEl.textContent = game.players[game.currentPlayerIndex].name;

    // Mettre à jour le classement
    updateScores();

    // Vérifie fin de partie
    if(game.cards.every(c => c.played)) {
      endGame();
    }
  }

  // --- CLASSEMENT ---
function updateScores() {
  const scoreList = document.getElementById("score-list");
  if(!scoreList) return;
  // On trie les joueurs par score décroissant
  const sortedPlayers = [...game.players].sort((a,b) => b.score - a.score);
  scoreList.innerHTML = "";
  sortedPlayers.forEach((p,i)=>{
    let emoji = i===0?"🏆 ":i===1?"🥈 ":i===2?"🥉 ":"";
    const li = document.createElement("li");
    li.innerHTML = `<span class="emoji">${emoji}</span>${p.name} - ${p.score} pts`;
    scoreList.appendChild(li);
  });
}

  // --- FIN DE PARTIE ---
async function endGame() {

  // --------- SAVE ARCHIVE ---------
 async function saveArchive() {
  try {
    await fetch("/archives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `Partie du ${new Date().toLocaleDateString()}`,
        players: game.players.map(p => ({
          name: p.name,
          theme: p.theme,
          score: p.score
        }))
      })
    });
  } catch (err) {
    console.error("Erreur en sauvegardant la partie :", err);
  }
}

  await saveArchive();

  // --------- OVERLAY FIN ---------
  const overlayEnd = document.createElement("div");
  overlayEnd.classList.add("final-overlay");
  overlayEnd.style.display = "flex";

  overlayEnd.innerHTML = (() => {
    const topScore = Math.max(...game.players.map(p => p.score));
    const winners = game.players.filter(p => p.score === topScore);

    return `
      <div class="overlay-content">
        <h2>Félicitations ${winners.map(p=>p.name).join(", ")}</h2>
        <p>Score : ${topScore} pts</p>
        <ol>
          ${game.players
            .sort((a,b)=>b.score-a.score)
            .map((p,i)=>{
              const emoji = i===0?"🏆 ":i===1?"🥈 ":i===2?"🥉 ":"";
              return `<li>${emoji}${p.name} - ${p.score} pts</li>`;
            }).join("")}
        </ol>
        <button id="replayBtn">Retour à l'accueil</button>
      </div>
    `;
  })();

  document.querySelector(".grid-wrapper").appendChild(overlayEnd);

document.getElementById("replayBtn").onclick = () => location.href = "/";
}



  // --- Initialisation du classement ---
  updateScores();

});
