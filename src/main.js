import assistant from './index.js'
import { initializeFuzzyArea } from "fuzzy-area";


document.addEventListener('DOMContentLoaded', () => {
  assistant()
  initializeFuzzyArea();
})
