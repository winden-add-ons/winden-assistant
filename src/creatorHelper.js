export const twaBreakpointInputsCreator = (elId, elName) => `
      <div>
        <input type="checkbox" id="${elId}" name="${elName}" checked class="sr-only peer" />

        <label
          for="${elId}"
          class="tw-button"
        >
          <span class="select-none">${elName}</span>
        </label>
      </div>
    `;

export const twaPositionButtonCreator = (elName, elClasses) => `
      <button data-position='${elClasses}' class="tw-button select-none">
        <span class="select-none">${elName}</span>
      </button>
  `;

export const twaRelativeButtonCreator = (elName) => `
    <button data-relative='${elName}' class="tw-button">
      <span class="select-none">${elName}</span>
    </button>
`;

export const twaTitleCreator = (elTitle) => `
  <strong class="text-slate-700 font-medium text-sm select-none">
    ${elTitle}
  </strong>
`
