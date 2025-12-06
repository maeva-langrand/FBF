document.addEventListener("DOMContentLoaded", () => {
  const gameDataEl = document.getElementById("gameData");
  const game = JSON.parse(gameDataEl.dataset.game);

  const cards = document.querySelectorAll(".card");
  const currentPlayerEl = document.getElementById("current-player");
  const timerEl = document.getElementById("timer"); // ⚡ ici

  // --- TIMER ---
  const TIMER_DURATION = 30;
  let remainingTime = TIMER_DURATION;

  const timerInterval = setInterval(() => {
    remainingTime--;
    timerEl.textContent = remainingTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      hideAllCards();
    }
  }, 1000);

  function hideAllCards() {
    cards.forEach(card => {
      card.classList.add("card-hidden");
      const front = card.querySelector(".front");
      if (front) front.innerHTML = `<div class="card-number">${card.dataset.number || ""}</div>`;
    });
  }

  function markCardPlayed(card) {
    card.classList.remove("card-hidden");
    card.classList.add("card-played");
    const front = card.querySelector(".front");
    if (front) front.innerHTML = `<div class="card-number">${card.dataset.number || ""}</div>`;
  }

  function nextPlayer() {
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    currentPlayerEl.textContent = game.players[game.currentPlayerIndex].name;
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      markCardPlayed(card);
      nextPlayer();
    });
  });
});
