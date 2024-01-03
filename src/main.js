import assistant from './parts/index.js'
import { initializeFuzzyArea } from "fuzzy-area";
import { injectCSSIntoIframe } from "./parts/iframeUtils.js";
import { cssActiveEleementAnimation } from "./parts/cssActiveEleementAnimation.js";
import { additionalPrefixes } from "./parts/prefixesConfig.js";


document.addEventListener('DOMContentLoaded', () => {
    assistant();
    initializeFuzzyArea({
        containerId: "twaClassesAdd",
        waitForElement: true,
        maxSuggestions: 40,
        prefixMention: ["@", "#", ":"],
    });    
})

document.addEventListener("DOMContentLoaded", (event) => {
    var prefixesFromScreens = tailwindScreens.map(
        (screen) => screen.name + ":"
    );

    var prefixes = prefixesFromScreens.concat(additionalPrefixes);
    window.prefixes = prefixes;
    // console.log(prefixes);
});

injectCSSIntoIframe("winden-assistant-iframe", cssActiveEleementAnimation);

