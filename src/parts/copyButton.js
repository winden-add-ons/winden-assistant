// copyButton.js

export function initializeCopyButton() {
    document.addEventListener("DOMContentLoaded", () => {
        const targetEle = document.getElementById("twaClassesEditor");
        const copyButton = document.getElementById("assistantCopy");

        copyButton.addEventListener("click", () => {
            const mirroredTextarea = document.createElement("textarea");
            mirroredTextarea.classList.add("mirrored-textarea");
            document.body.appendChild(mirroredTextarea);

            mirroredTextarea.value = targetEle.innerHTML;
            mirroredTextarea.select();
            document.execCommand("copy");

            copyButton.innerHTML = "Copied";
            mirroredTextarea.remove();
        });
    });
}
