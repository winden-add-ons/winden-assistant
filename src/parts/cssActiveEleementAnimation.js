// cssRules.js
export const cssActiveEleementAnimation = `
  @keyframes blink-outline {
      0%, 100% { outline: 2px solid #e100aa; outline-offset: 2px; }
      50% { outline: none; }
  }

  .tw-element-active {
      animation: blink-outline 1s linear 1;
  }
`;
