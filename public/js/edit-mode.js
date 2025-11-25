document.addEventListener("DOMContentLoaded", () => {

    const toggleButton = document.getElementById("toggle_edit_mode");
    const body = document.body;

    // Edit mode sauvegardé ou pas ?
    const savedMode = localStorage.getItem("editMode");

    if (savedMode === "on") {
        body.classList.add("edit_mode"); 
    }

    toggleButton.textContent = 
        body.classList.contains("edit_mode")
            ? "Quitter le mode édition"
            : "Mode édition";

    // Clic
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("edit_mode"); 

        const isActive = body.classList.contains("edit_mode"); 
        // Sauvegarde dans le localStorage
        localStorage.setItem("editMode", isActive ? "on" : "off");

        toggleButton.textContent = 
            isActive ? "Quitter le mode édition" : "Mode édition";
    });
});
