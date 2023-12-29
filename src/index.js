// import { initTailwind } from './initTailwind.js'

import {
    getBreakpointClasses,
    getActiveBreakpoint,
    setBreakpointToIframe,
} from "./breakpointHelpers.js";
import {
    twaBreakpointInputsCreator,
    twaPositionButtonCreator,
    twaRelativeButtonCreator,
    twaTitleCreator,
} from "./creatorHelper.js";
import {
    addTWActiveClass,
    normalizeTextareaClasses,
    deNormalizeTextareaClasses,
} from "./helper.js";
import { twaIframeId } from "./constant.js";

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

            popupWrapper.innerHTML = `
      <details id="twaPopup" tabindex="0" class="relative bg-indigo-800 open:bg-white text-slate-900 border border-solid border-slate-600 open:border-slate-300 shadow-md rounded-lg group overflow-hidden max-w-sm open:w-screen fixed bottom-2 right-2">
        <summary class="flex items-center gap-1 justify-center h-10 w-10 group-open:h-12 group-open:w-full group-open:bg-slate-50 cursor-pointer focus:outline-none group-open:hover:bg-slate-100">
          <span class="select-none">
            🤖
          </span>

          <span class="group-open:block hidden text-sm font-medium select-none">
            - Winden CSS Assistant
          </span>
        </summary>
        
        <div class="p-4 space-y-4">
          <div>
          <form id="twaClassesAdd">
            ${twaTitleCreator("Edit Classes")}

            <div class="relative">
                <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="p-1 mt-1 border-slate-100 bg-slate-50 rounded-md w-full text-sm focus:ring focus:ring-slate-100 focus:outline-none focus:border-slate-300 resize-none"></textarea>
            </div>
            <div class="flex">
                <button class="bg-slate-900  text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-200 hover:ring hover:ring-indigo-200 hover:bg-indigo-600">
                <span class="select-none">Update</span>
                </button>
                
                <!-- <button 
                    id="assistantCopy"
                    class="bg-slate-900  text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-200 hover:ring hover:ring-indigo-200 hover:bg-indigo-600"
                    >Copy
                </button> -->
            </div>
          </form>
        </div>

          <div>
            ${twaTitleCreator("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
                <button data-type='breakpoint' id="none" name="none" class="tw-button select-none border-0">
                none
                </button>
              ${tailwindScreens
                  .map((ts) => twaBreakpointInputsCreator(ts.size, ts.name))
                  .join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${twaTitleCreator("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${twaRelativeButtonCreator("parent")}
              ${twaRelativeButtonCreator("child")}
              ${twaRelativeButtonCreator("prev")}
              ${twaRelativeButtonCreator("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${twaTitleCreator("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              
            <div>
              <button data-position="top-4,left-4" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="-0.75" y="0.75" width="28.5" height="20.5" transform="matrix(-1 0 0 1 29.5 1)" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M4 15.5625L15.5625 4L4 4L4 15.5625Z" fill="#475569"/>
                  </svg>                
                </span>
              </button>
            </div>
            
            <div>
              <button data-position="bottom-4,left-4" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30.25" y="22.25" width="28.5" height="20.5" transform="rotate(180 30.25 22.25)" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M4 8.4375L15.5625 20L4 20L4 8.4375Z" fill="#475569"/>
                  </svg>
                </span>
              </button>
            </div>
                      
            <div>
              <button data-position="top-4,right-4" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75" y="1.75" width="28.5" height="20.5" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M28 15.5625L16.4375 4L28 4L28 15.5625Z" fill="#475569"/>
                  </svg>
                </span>
              </button>
            </div>
                 
            <div>
              <button data-position="bottom-4,right-4" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="-0.75" width="28.5" height="20.5" transform="matrix(1 0 0 -1 1 21.5)" stroke="#CBD5E1" stroke-width="1.5"/>
                  <path d="M28 8.4375L16.4375 20L28 20L28 8.4375Z" fill="#475569"/>
                </svg>
                </span>
              </button>
            </div>
  
            </div>

            <p class="text-center text-xs select-none">
                Open element CSS information with <span class="font-medium">CMD + Click</span>.
            </p>

          </div>
        </div>
      </details>
    `;

            popupWrapper.classList.add("fixed", "z-50");

            let popupPosition = ["right-4", "bottom-4"];

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
                if (twaPopup.open && event.metaKey) {
                    if (keyCode === "Enter") {
                        event.preventDefault();
                        submitClassesForm(event);
                    } else if (keyCode === "ArrowLeft") {
                        event.preventDefault();
                        const prevBtn = twaRelativeElementButtons.find(
                            (treb) =>
                                treb.getAttribute("data-relative") === "prev"
                        );
                        if (prevBtn) {
                            const event = new Event("click");
                            prevBtn.dispatchEvent(event);
                        }
                    } else if (keyCode === "ArrowUp") {
                        event.preventDefault();
                        const parentBtn = twaRelativeElementButtons.find(
                            (treb) =>
                                treb.getAttribute("data-relative") === "parent"
                        );
                        if (parentBtn) {
                            const event = new Event("click");
                            parentBtn.dispatchEvent(event);
                        }
                    } else if (keyCode === "ArrowRight") {
                        event.preventDefault();
                        const nextBtn = twaRelativeElementButtons.find(
                            (treb) =>
                                treb.getAttribute("data-relative") === "next"
                        );
                        if (nextBtn) {
                            const event = new Event("click");
                            nextBtn.dispatchEvent(event);
                        }
                    } else if (keyCode === "ArrowDown") {
                        event.preventDefault();
                        const childBtn = twaRelativeElementButtons.find(
                            (treb) =>
                                treb.getAttribute("data-relative") === "child"
                        );
                        if (childBtn) {
                            const event = new Event("click");
                            childBtn.dispatchEvent(event);
                        }
                    }
                }
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
