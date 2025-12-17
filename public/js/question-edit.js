document.addEventListener("DOMContentLoaded", () => {

    function setupDelete(buttonSelector, hiddenInputId, blockSelector) {
        const button = document.querySelector(buttonSelector);
        const hiddenInput = document.getElementById(hiddenInputId);
        const block = document.querySelector(blockSelector);

        if (!button || !hiddenInput || !block) return;

        button.addEventListener("click", () => {

            hiddenInput.value = "true";
            block.style.display = "none";
        });
    }


    setupDelete(
        ".delete-question-image-btn",
        "deleteQuestionImage",
        "#question-image-block"
    );


    setupDelete(
        ".delete-response-image-btn",
        "deleteResponseImage",
        "#response-image-block"
    );


    setupDelete(
        ".delete-audio-btn",
        "deleteAudio",
        "#audio-block"
    );
});