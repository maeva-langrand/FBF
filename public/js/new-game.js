document.addEventListener("DOMContentLoaded", () => {
  const playerCountInput = document.getElementById("playerCount");
  const playersContainer = document.getElementById("playersContainer");

  // récupérer les thèmes depuis un data-attribute si tu les passes depuis EJS
  const themesDiv = document.getElementById("themesData");
  const themes = JSON.parse(themesDiv.dataset.themes);

  playerCountInput.addEventListener("input", () => {
    const count = parseInt(playerCountInput.value) || 0;
    playersContainer.innerHTML = ""; // vider l'ancien contenu

    for (let i = 0; i < count; i++) {
      const playerDiv = document.createElement("div");
      playerDiv.classList.add("player-row");

      // Nom du joueur
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.name = `players[${i}][name]`;
      nameInput.placeholder = `Nom du joueur ${i + 1}`;
      nameInput.required = true;

      // Thème préféré
      const themeSelect = document.createElement("select");
      themeSelect.name = `players[${i}][theme]`;
      themeSelect.required = true;

      themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.id;
        option.textContent = theme.theme_name;
        themeSelect.appendChild(option);
      });

      playerDiv.appendChild(nameInput);
      playerDiv.appendChild(themeSelect);
      playersContainer.appendChild(playerDiv);
    }
  });

  const launchBtn = document.getElementById("launchGameBtn");
const modal = document.getElementById("rulesModal");
const startBtn = document.getElementById("startGameBtn");

launchBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  modal.classList.remove("hidden");
});

const form = document.getElementById("newGameForm");

startBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  form.submit();
});


});
