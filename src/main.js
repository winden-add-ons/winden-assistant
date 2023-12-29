import assistant from './index.js'
import { initializeFuzzyArea } from "fuzzy-area";
import { injectCSSIntoIframe } from "./iframeUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    assistant();
    initializeFuzzyArea({
        containerId: "twaClassesAdd",
        waitForElement: true,
        maxSuggestions: 40,
        prefixMention: ["@", "#", ":"],
    });    
})


const cssRules = `
  @keyframes blink-outline {
      0%, 100% { outline: 2px solid #e100aa; outline-offset: 2px; }
      50% { outline: none; }
  }

  .tw-element-active {
      animation: blink-outline 1s linear 1; /* Adjust the duration (2s) and iterations (3) as needed */
  }
`;

injectCSSIntoIframe("winden-assistant-iframe", cssRules);


// defaults for prefixes
var additionalPrefixes = [
    "*:",
    "first-letter:",
    "first-line:",
    "marker:",
    "selection:",
    "before:",
    "after:",
    "first:",
    "last:",
    "only:",
    "odd:",
    "even:",
    "visited:",
    "target:",
    "empty:",
    "hover:",
    "focus:",
    "active:",
    "group-[]:",
    "group-odd:",
    "group-even:",
    "group-target:",
    "group-open:",
    "group-default:",
];

document.addEventListener("DOMContentLoaded", (event) => {
    var prefixesFromScreens = tailwindScreens.map(
        (screen) => screen.name + ":"
    );

    var prefixes = prefixesFromScreens.concat(additionalPrefixes);
    window.prefixes = prefixes;
    console.log(prefixes);
});
