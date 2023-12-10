import { initTailwind } from './initTailwind.js'
import {
  getBreakpointClasses,
  getActiveBreakpoint,
} from './breakpointHelpers.js'
import {
  twaBreakpointInputsCreator,
  twaPositionButtonCreator,
  twaRelativeButtonCreator,
  twaTitleCreator,
} from './creatorHelper.js'
import { addTWActiveClass } from './helper.js'

export default function () {
  initTailwind()

  const tailwindScreensTimer = setInterval(() => {
    if (tailwindScreens?.length) {
      clearInterval(tailwindScreensTimer);

      const popupWrapper = document.createElement('div')

      popupWrapper.innerHTML = `
      <details id="twaPopup" class="relative bg-slate-900 shadow-lg rounded-lg group overflow-hidden max-w-sm open:w-screen">
        <summary class="flex items-center gap-1 justify-center h-10 w-10 group-open:h-12 group-open:w-full group-open:bg-slate-800/50 cursor-pointer text-white focus:ring focus:ring-inset focus:ring-indigo-500 focus:outline-none">
          <span class="select-none">
            🤖
          </span>

          <span class="group-open:block hidden text-white text-sm font-medium select-none">
            - Tailwind CSS Assistant
          </span>
        </summary>

        <div class="p-4 space-y-4">
          <p class="text-center text-xs text-slate-400 select-none">
            Open element CSS information with <span class="font-medium">CMD + Click</span>.
          </p>

          <div>
          <form id="twaClassesAdd">
            ${twaTitleCreator('Edit Classes')}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            ${twaTitleCreator('Toggle Breakpoints')}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${tailwindScreens.map(ts => twaBreakpointInputsCreator(ts.size, ts.name)).join('')}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${twaTitleCreator('Change Element')}

            <div class="flex flex-wrap gap-2 mt-1">
              ${twaRelativeButtonCreator('parent')}
              ${twaRelativeButtonCreator('child')}
              ${twaRelativeButtonCreator('prev')}
              ${twaRelativeButtonCreator('next')}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${twaTitleCreator('Popup Position')}

            <div class="flex flex-wrap gap-2 mt-1">
              ${twaPositionButtonCreator('tl', ['top-4', 'left-4'])}
              ${twaPositionButtonCreator('tr', ['top-4', 'right-4'])}
              ${twaPositionButtonCreator('bl', ['bottom-4', 'left-4'])}
              ${twaPositionButtonCreator('br', ['bottom-4', 'right-4'])}
            </div>
          </div>
        </div>
      </details>
    `

      popupWrapper.classList.add('fixed')

      let popupPosition = ['right-4', 'bottom-4']

      popupPosition.forEach((className) => popupWrapper.classList.add(className))

      document.body.appendChild(popupWrapper)

      const twaBreakpoint = document.getElementById('twaBreakpoint')
      const twaBreakpointInputs = [
        ...document.querySelectorAll('input[type="checkbox"]'),
      ]

      const twaClassesAdd = document.getElementById('twaClassesAdd')
      const twaClassesEditor = document.getElementById('twaClassesEditor')

      const twaPopupPositionButtons = [
        ...document.querySelectorAll('[data-position]'),
      ]
      const twaRelativeElementButtons = [
        ...document.querySelectorAll('[data-relative]'),
      ]

      const twaError = document.getElementById('twaError')

      let currentTarget

      let twaBreakpointClasses

      document.addEventListener('click', (eventItem) => {
        const targetEl = eventItem.target

        if (!twaPopup.contains(targetEl)) {
          twaPopup.open = false
        }

        if (eventItem.metaKey) {
          eventItem.preventDefault()

          twaPopup.open = true

          currentTarget = targetEl

          twaBreakpoint.innerText = getActiveBreakpoint()

          twaBreakpointInputs.forEach((twaInput) => (twaInput.checked = true))

          twaClassesEditor.value = currentTarget.className

          twaBreakpointClasses = getBreakpointClasses(currentTarget)
        }
      })

      document.addEventListener('keydown', function (event) {
        if (twaPopup.open && event.metaKey) {
          const keyCode = event.key;
          if (keyCode === 'Enter') {
            event.preventDefault();
            submitClassesForm(event);
          } else if (keyCode >= '1' && keyCode <= '9') {
            if (Array.from(twaBreakpointInputs)?.length) {
              event.preventDefault();
              const twaInput = twaBreakpointInputs[parseInt(keyCode) - 1];
              if (twaInput) {
                const event = new Event("input");
                twaInput.dispatchEvent(event);
              } else {
                [...document.querySelectorAll('input[type="checkbox"]:focus')].forEach((twaInput) => twaInput.blur());
              }
            }
          } else if (keyCode === 'ArrowLeft') {
            event.preventDefault();
            const prevBtn = twaRelativeElementButtons.find(treb => treb.getAttribute('data-relative') === 'prev');
            if (prevBtn) {
              const event = new Event("click");
              prevBtn.dispatchEvent(event);
            }
          } else if (keyCode === 'ArrowUp') {
            event.preventDefault();
            const parentBtn = twaRelativeElementButtons.find(treb => treb.getAttribute('data-relative') === 'parent');
            if (parentBtn) {
              const event = new Event("click");
              parentBtn.dispatchEvent(event);
            }
          } else if (keyCode === 'ArrowRight') {
            event.preventDefault();
            const nextBtn = twaRelativeElementButtons.find(treb => treb.getAttribute('data-relative') === 'next');
            if (nextBtn) {
              const event = new Event("click");
              nextBtn.dispatchEvent(event);
            }
          } else if (keyCode === 'ArrowDown') {
            event.preventDefault();
            const childBtn = twaRelativeElementButtons.find(treb => treb.getAttribute('data-relative') === 'child');
            if (childBtn) {
              const event = new Event("click");
              childBtn.dispatchEvent(event);
            }
          }
        }
      });

      twaBreakpointInputs.forEach((twaInput) => {
        twaInput.addEventListener('input', () => {
          if ((typeof twaBreakpointClasses === 'object' && Object.keys(twaBreakpointClasses)?.length) || twaBreakpointClasses?.length) {
            twaBreakpointClasses[twaInput.name].forEach((twClass) =>
              currentTarget.classList.toggle(twClass)
            )
            twaClassesEditor.value = currentTarget.className
          }
          twaInput.focus();
        })
      })

      twaRelativeElementButtons.forEach((relativeElementButton) => {
        relativeElementButton.addEventListener('click', () => {
          let relativeElement

          const relativeElementKey =
            relativeElementButton.getAttribute('data-relative')

          if (relativeElementKey === 'parent') {
            relativeElement = currentTarget.parentElement
              ? currentTarget.parentElement
              : currentTarget

            if (!currentTarget.parentElement) {
              renderError('No parent element')
            } else {
              addTWActiveClass(currentTarget.parentElement);
            }
          }

          if (relativeElementKey === 'prev') {
            relativeElement = currentTarget.previousElementSibling
              ? currentTarget.previousElementSibling
              : currentTarget

            if (!currentTarget.previousElementSibling) {
              renderError('No previous sibling element')
            } else {
              addTWActiveClass(currentTarget.previousElementSibling);
            }
          }

          if (relativeElementKey === 'next') {
            relativeElement = currentTarget.nextElementSibling
              ? currentTarget.nextElementSibling
              : currentTarget

            if (!currentTarget.nextElementSibling) {
              renderError('No next sibling element')
            } else {
              addTWActiveClass(currentTarget.nextElementSibling);
            }
          }

          if (relativeElementKey === 'child') {
            relativeElement = currentTarget.firstElementChild
              ? currentTarget.firstElementChild
              : currentTarget

            if (!currentTarget.firstElementChild) {
              renderError('No child element')
            } else {
              addTWActiveClass(currentTarget.firstElementChild);
            }
          }

          currentTarget = relativeElement

          twaBreakpointInputs.forEach((twaInput) => (twaInput.checked = true))

          twaClassesEditor.value = currentTarget.className

          twaBreakpointClasses = getBreakpointClasses(currentTarget)
        })
      })

      twaClassesEditor.addEventListener('keydown', (eventItem) => {
        if (eventItem.key === 'Enter') {
          eventItem.preventDefault()

          submitClassesForm(eventItem)
        }
      })

      twaClassesAdd.addEventListener('submit', (eventItem) => {
        submitClassesForm(eventItem)
      })

      function submitClassesForm(eventItem) {
        eventItem.preventDefault()

        currentTarget.className = twaClassesEditor.value

        twaBreakpointClasses = getBreakpointClasses(currentTarget)
      }

      window.addEventListener('resize', () => {
        twaBreakpoint.innerText = getActiveBreakpoint()
      })

      twaPopupPositionButtons.forEach((positionButton) => {
        positionButton.addEventListener('click', () => {
          popupPosition.forEach((className) =>
            popupWrapper.classList.remove(className)
          )

          popupPosition = positionButton.getAttribute('data-position').split(',')

          popupPosition.forEach((className) =>
            popupWrapper.classList.add(className)
          )
        })
      })

      const renderError = (errorMessage) => {
        twaError.removeAttribute('hidden')

        twaError.innerText = errorMessage

        setTimeout(() => twaError.setAttribute('hidden', true), 3000)
      }
    }
  }, 100);
}
