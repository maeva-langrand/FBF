document.addEventListener("DOMContentLoaded", () => {
  const gameDataEl = document.getElementById("gameData");
  const game = JSON.parse(gameDataEl.dataset.game);

  const gridContainer = document.querySelector(".grid-container");
  const currentPlayerEl = document.getElementById("current-player");
  const timerEl = document.getElementById("timer");

  let timerValue = 30;
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
        const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.style.display = "none";
  }
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
    overlay.innerHTML = `
      <div class="overlay-content" style="background:${card.theme_color}">
        <h2 class="theme-text">${card.theme_name}</h2>
        <p class="question-text">${card.question}</p>
        ${card.question_image ? `<img src="/uploads/${card.question_image}" style="max-width:90%; max-height:50%;">` : ""}
        ${card.youtube_url ? `<button id="playAudioBtn">▶️ Play Audio</button>` : ""}
        <button id="showAnswerBtn">Afficher la réponse</button>
      </div>
    `;

    if (card.youtube_url) {
      document.getElementById("playAudioBtn").addEventListener("click", () => {
        const start = card.youtube_start || 0;
        const end = card.youtube_end || 30;
        const iframe = document.createElement("iframe");
        iframe.width = "600";
        iframe.height = "340";
        iframe.src = `https://www.youtube.com/embed/${card.youtube_url.split("v=")[1]}?start=${start}&end=${end}&autoplay=1`;
        iframe.frameBorder = "0";
        iframe.allow = "autoplay";
        overlay.querySelector(".overlay-content").appendChild(iframe);
      });
    }

    document.getElementById("showAnswerBtn").addEventListener("click", () => {
      overlay.querySelector(".overlay-content").innerHTML = `
        <h2 class="theme-text">${card.theme_name}</h2>
        <p class="answer-text">${card.response}</p>
        ${card.response_image ? `<img src="/uploads/${card.response_image}" style="max-width:90%; max-height:50%;">` : ""}
        ${card.youtube_url ? `<button id="playAudioBtn">▶️ Play Audio</button>` : ""}
        <div class="thumb-buttons">
          <button id="thumbUpBtn">👍</button>
          <button id="thumbDownBtn">👎</button>
        </div>
      `;

      if (card.youtube_url) {
        document.getElementById("playAudioBtn").addEventListener("click", () => {
          const start = card.youtube_start || 0;
          const end = card.youtube_end || 30;
          const iframe = document.createElement("iframe");
          iframe.width = "600";
          iframe.height = "340";
          iframe.src = `https://www.youtube.com/embed/${card.youtube_url.split("v=")[1]}?start=${start}&end=${end}&autoplay=1`;
          iframe.frameBorder = "0";
          iframe.allow = "autoplay";
          overlay.querySelector(".overlay-content").appendChild(iframe);
        });
      }

      document.getElementById("thumbUpBtn").addEventListener("click", () => finishCard(cardEl, card));
      document.getElementById("thumbDownBtn").addEventListener("click", () => finishCard(cardEl, card));
    });
  }

  function finishCard(cardEl, card) {
    card.played = true;
    cardEl.classList.add("played");
    cardEl.style.backgroundColor = card.theme_color;
    cardEl.style.border = `3px solid ${card.theme_color}`;
    cardEl.innerHTML = `<div class="card-number">${card.number}</div>`;

    overlay.style.display = "none";
    activeCardEl = null;

    // Joueur suivant
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    currentPlayerEl.textContent = game.players[game.currentPlayerIndex].name;
  }
});
