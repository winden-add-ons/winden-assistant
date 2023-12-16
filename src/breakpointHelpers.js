export function getBreakpointClasses(twElement) {
  const classList = twElement.classList;
  const result = {};

  tailwindScreens?.length && tailwindScreens.forEach(tailwindScreen => {
    switch (true) {
      case classList.contains(tailwindScreen.name):
        result[tailwindScreen.name] = filterByPrefix(`${tailwindScreen.name}:`, classList);
        break;
    }
  });

  return result;
}

export function filterByPrefix(prefix, classList) {
  return [...classList].filter((className) => className.startsWith(prefix));
}

export function getActiveBreakpoint() {
  const windowWidth = window.innerWidth;

  const activeBreakpoint = tailwindScreens?.length ? tailwindScreens
    .sort((a, b) => {
      const sizeA = parseInt(a.size);
      const sizeB = parseInt(b.size);

      return sizeB - sizeA;
    })
    .find((breakpoint) => breakpoint.size.split('px')[0].trim() <= windowWidth) : null;

  return activeBreakpoint ? activeBreakpoint.name : 'Default';
}

export function setBreakpointToIframe(event) {
  const _target = event.target;
  if(_target?.id) {
    const newWidth = _target.id === 'none' ? '100%' : _target.id;
    if(window?.parent) {
      window.parent.postMessage(newWidth, '*');
    }
  }
}