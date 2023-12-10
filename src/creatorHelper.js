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
    <div>
      <button data-position='${elClasses}' class="tw-button">
        <span class="select-none">${elName}</span>
      </button>
    </div>
  `

export const twaRelativeButtonCreator = (elName) => `
  <div>
    <button data-relative='${elName}' class="tw-button">
      <span class="select-none">${elName}</span>
    </button>
  </div>
`;

export const twaTitleCreator = (elTitle) => `
  <strong class="text-slate-700 font-medium text-sm select-none">
    ${elTitle}
  </strong>
`
