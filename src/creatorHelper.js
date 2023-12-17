export const twaBreakpointInputsCreator = (elId, elName) => `
      <button data-type='breakpoint' id="${elId}" name="${elName}" class="tw-button select-none border-0">
      ${elName}
      </button>
    `;

export const twaPositionButtonCreator = (elName, elClasses) => `
      <button data-position='${elClasses}' class="tw-button select-none border-0">
        <span class="select-none">${elName}</span>
      </button>
  `;

export const twaRelativeButtonCreator = (elName) => `
    <button data-relative='${elName}' class="tw-button border-0">
      <span class="select-none">${elName}</span>
    </button>
`;

export const twaTitleCreator = (elTitle) => `
  <strong class="text-slate-700 font-medium text-sm select-none border-0">
    ${elTitle}
  </strong>
`;
