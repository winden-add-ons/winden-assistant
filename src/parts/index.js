// import { initTailwind } from './initTailwind.js'

import {
    getBreakpointClasses,
    getActiveBreakpoint,
    setBreakpointToIframe,
} from "./breakpointHelpers.js";

import {
    addTWActiveClass,
    normalizeTextareaClasses,
    deNormalizeTextareaClasses,
} from "./helper.js";
import { twaIframeId } from "./constant.js";
import popupHTML from "./popupHTML.js";
import shortcuts from './shortcuts.js'; // Import the code from shortcuts.js

export default function () {
    // initTailwind()

    const twaPopupInterval = setInterval(() => {
        const twaPopup = document.getElementById("twaPopup");
        if (twaPopup) {
            clearInterval(twaPopupInterval);
            if (twaPopup.tabIndex !== -1) {
                twaPopup.focus();
            }
        }
    }, 100);

    const tailwindScreensTimer = setInterval(() => {
        if (tailwindScreens?.length) {
            clearInterval(tailwindScreensTimer);

            const popupWrapper = document.createElement("div");

            popupWrapper.innerHTML = popupHTML;

            popupWrapper.classList.add("fixed", "z-50");

            let popupPosition = ["right-2", "bottom-2"];

            popupPosition.forEach((className) =>
                popupWrapper.classList.add(className)
            );

            document.body.appendChild(popupWrapper);

            const twaBreakpoint = document.getElementById("twaBreakpoint");
            const twaBreakpointInputs = [
                ...document.querySelectorAll('[data-type="breakpoint"]'),
            ];

            const twaClassesAdd = document.getElementById("twaClassesAdd");
            const twaClassesEditor =
                document.getElementById("twaClassesEditor");

            const twaPopupPositionButtons = [
                ...document.querySelectorAll("[data-position]"),
            ];
            const twaRelativeElementButtons = [
                ...document.querySelectorAll("[data-relative]"),
            ];

            const twaError = document.getElementById("twaError");

            let currentTarget;

            let twaBreakpointClasses;

            // Ensure that the iframe is fully loaded before attaching the event listener
            window.addEventListener("load", function () {
                const iframe = document.querySelector(`#${twaIframeId}`);
                if (iframe && iframe.contentWindow) {
                    // Access the document inside the iframe
                    const iframeDocument = iframe.contentWindow.document;

                    // Attach the event listener to the iframe's document
                    iframeDocument.addEventListener("click", (eventItem) => {
                        const targetEl = eventItem.target;

                        if (eventItem.metaKey) {
                            eventItem.preventDefault();

                            twaPopup.open = true;

                            currentTarget = targetEl;
                            addTWActiveClass(currentTarget);

                            twaBreakpoint.innerText = getActiveBreakpoint();

                            twaClassesEditor.value = normalizeTextareaClasses(
                                currentTarget.className
                            );

                            twaBreakpointClasses =
                                getBreakpointClasses(currentTarget);
                        }
                    });
                }
            });

            document.addEventListener("keydown", function (event) {
                const keyCode = event.key;
                // if (twaPopup.open && event.metaKey) {
                //     if (keyCode === "Enter") {
                //         event.preventDefault();
                //         submitClassesForm(event);
                //     } else if (keyCode === "ArrowLeft") {
                //         event.preventDefault();
                //         const prevBtn = twaRelativeElementButtons.find(
                //             (treb) =>
                //                 treb.getAttribute("data-relative") === "prev"
                //         );
                //         if (prevBtn) {
                //             const event = new Event("click");
                //             prevBtn.dispatchEvent(event);
                //         }
                //     } else if (keyCode === "ArrowUp") {
                //         event.preventDefault();
                //         const parentBtn = twaRelativeElementButtons.find(
                //             (treb) =>
                //                 treb.getAttribute("data-relative") === "parent"
                //         );
                //         if (parentBtn) {
                //             const event = new Event("click");
                //             parentBtn.dispatchEvent(event);
                //         }
                //     } else if (keyCode === "ArrowRight") {
                //         event.preventDefault();
                //         const nextBtn = twaRelativeElementButtons.find(
                //             (treb) =>
                //                 treb.getAttribute("data-relative") === "next"
                //         );
                //         if (nextBtn) {
                //             const event = new Event("click");
                //             nextBtn.dispatchEvent(event);
                //         }
                //     } else if (keyCode === "ArrowDown") {
                //         event.preventDefault();
                //         const childBtn = twaRelativeElementButtons.find(
                //             (treb) =>
                //                 treb.getAttribute("data-relative") === "child"
                //         );
                //         if (childBtn) {
                //             const event = new Event("click");
                //             childBtn.dispatchEvent(event);
                //         }
                //     }
                // }
                if (event.metaKey) {
                    if (keyCode >= "1" && keyCode <= "9") {
                        if (Array.from(twaBreakpointInputs)?.length) {
                            event.preventDefault();
                            const twaInput =
                                twaBreakpointInputs[parseInt(keyCode) - 1];
                            if (twaInput) {
                                const event = new Event("click");
                                twaInput.dispatchEvent(event);
                            } else {
                                [
                                    ...document.querySelectorAll(
                                        '[data-type="breakpoint"]:focus'
                                    ),
                                ].forEach((twaInput) => twaInput.blur());
                            }
                        }
                    }
                }
            });

            twaBreakpointInputs.forEach((twaInput) => {
                twaInput.addEventListener("click", (event) => {
                    if (
                        (typeof twaBreakpointClasses === "object" &&
                            Object.keys(twaBreakpointClasses)?.length) ||
                        twaBreakpointClasses?.length
                    ) {
                        twaBreakpointClasses[twaInput.name].forEach((twClass) =>
                            currentTarget.classList.toggle(twClass)
                        );
                        twaClassesEditor.value = normalizeTextareaClasses(
                            currentTarget.className
                        );
                    }
                    twaInput.focus();
                    setBreakpointToIframe(event);
                });
            });

            twaRelativeElementButtons.forEach((relativeElementButton) => {
                relativeElementButton.addEventListener("click", () => {
                    let relativeElement;

                    const relativeElementKey =
                        relativeElementButton.getAttribute("data-relative");

                    if (relativeElementKey === "parent") {
                        relativeElement = currentTarget.parentElement
                            ? currentTarget.parentElement
                            : currentTarget;

                        if (!currentTarget.parentElement) {
                            renderError("No parent element");
                        } else {
                            addTWActiveClass(currentTarget.parentElement);
                        }
                    }

                    if (relativeElementKey === "prev") {
                        relativeElement = currentTarget.previousElementSibling
                            ? currentTarget.previousElementSibling
                            : currentTarget;

                        if (!currentTarget.previousElementSibling) {
                            renderError("No previous sibling element");
                        } else {
                            addTWActiveClass(
                                currentTarget.previousElementSibling
                            );
                        }
                    }

                    if (relativeElementKey === "next") {
                        relativeElement = currentTarget.nextElementSibling
                            ? currentTarget.nextElementSibling
                            : currentTarget;

                        if (!currentTarget.nextElementSibling) {
                            renderError("No next sibling element");
                        } else {
                            addTWActiveClass(currentTarget.nextElementSibling);
                        }
                    }

                    if (relativeElementKey === "child") {
                        relativeElement = currentTarget.firstElementChild
                            ? currentTarget.firstElementChild
                            : currentTarget;

                        if (!currentTarget.firstElementChild) {
                            renderError("No child element");
                        } else {
                            addTWActiveClass(currentTarget.firstElementChild);
                        }
                    }

                    currentTarget = relativeElement;

                    twaClassesEditor.value = normalizeTextareaClasses(
                        currentTarget.className
                    );

                    twaBreakpointClasses = getBreakpointClasses(currentTarget);
                });
            });

            twaClassesEditor.addEventListener("keydown", (eventItem) => {
                if (eventItem.key === "Enter") {
                    eventItem.preventDefault();

                    submitClassesForm(eventItem);
                }
            });

            twaClassesAdd.addEventListener("submit", (eventItem) => {
                submitClassesForm(eventItem);
            });

            function submitClassesForm(eventItem) {
                eventItem.preventDefault();

                // Check if currentTarget is defined and not null
                if (!currentTarget) {
                    alert("Select some element first");
                    return;
                }

                currentTarget.className = deNormalizeTextareaClasses(
                    twaClassesEditor.value
                );

                twaBreakpointClasses = getBreakpointClasses(currentTarget);
            }


            window.addEventListener("resize", () => {
                twaBreakpoint.innerText = getActiveBreakpoint();
            });

            twaPopupPositionButtons.forEach((positionButton) => {
                positionButton.addEventListener("click", () => {
                    popupPosition.forEach((className) =>
                        popupWrapper.classList.remove(className)
                    );

                    popupPosition = positionButton
                        .getAttribute("data-position")
                        .split(",");

                    popupPosition.forEach((className) =>
                        popupWrapper.classList.add(className)
                    );
                });
            });

            const renderError = (errorMessage) => {
                twaError.removeAttribute("hidden");

                twaError.innerText = errorMessage;

                setTimeout(() => twaError.setAttribute("hidden", true), 3000);
            };
        }
    }, 100);
}
