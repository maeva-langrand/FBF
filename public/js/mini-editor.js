function hookEditor(editorId, inputId) {

    const editor = document.getElementById(editorId);
    const input  = document.getElementById(inputId);

    if(!editor || !input) return;

    const toolbar = editor.previousElementSibling;

    toolbar.querySelectorAll("[data-cmd]").forEach(el => {

        const cmd = el.dataset.cmd;

        if(el.type === "color") {
            el.addEventListener("input", e => {
                document.execCommand(cmd, false, e.target.value);
                editor.focus();
            });
            return;
        }

        el.addEventListener("click", () => {
            document.execCommand(cmd, false, null);
            editor.focus();
        });
    });

    // Synchronise contenu HTML => input hidden
    editor.closest("form").addEventListener("submit", () => {
        input.value = editor.innerHTML;
    });
}

// Initialisation après chargement DOM
document.addEventListener("DOMContentLoaded", () => {
    hookEditor("questionEditor", "questionText");
    hookEditor("responseEditor", "response");
});

