import assistant from './index.js'
import { initializeFuzzyArea } from "fuzzy-area";
import { injectCSSIntoIframe } from "./iframeUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    assistant();
    initializeFuzzyArea({
        containerId: "twaClassesAdd",
        waitForElement: true,
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
