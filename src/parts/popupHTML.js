import {
    twaBreakpointInputsCreator,
    twaRelativeButtonCreator,
    twaTitleCreator,
} from "./creatorHelper.js";

const popupHTML = `
      <details id="twaPopup" tabindex="0" class="relative bg-white open:bg-white text-slate-900 border border-solid border-slate-900 open:border-slate-300 shadow-md rounded-lg group overflow-hidden max-w-sm open:w-screen fixed bottom-2 right-2">
        <summary class="flex items-center gap-1 justify-center h-10 w-10 group-open:h-12 group-open:w-full group-open:bg-slate-50 cursor-pointer focus:outline-none group-open:hover:bg-slate-100">
          <span class="select-none">
            🤖
          </span>

          <span class="group-open:block hidden text-sm font-medium select-none">
            - Winden CSS Assistant
          </span>
        </summary>
        
        <div class="p-4 space-y-4">
          <div>
          <form id="twaClassesAdd">
            ${twaTitleCreator("Edit Classes")}

            <div class="relative">
                <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="p-1 mt-1 border-slate-100 bg-slate-50 rounded-md w-full text-sm focus:ring focus:ring-slate-100 focus:outline-none focus:border-slate-300 resize-none"></textarea>
            </div>
            <div class="flex">
                <button class="bg-slate-900  text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-200 hover:ring hover:ring-indigo-200 hover:bg-indigo-600">
                <span class="select-none">Update</span>
                </button>
                
                <!-- <button 
                    id="assistantCopy"
                    class="bg-slate-900  text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-200 hover:ring hover:ring-indigo-200 hover:bg-indigo-600"
                    >Copy
                </button> -->
            </div>
          </form>
        </div>

          <div>
            ${twaTitleCreator("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
                <button data-type='breakpoint' id="none" name="none" class="tw-button select-none border-0">
                none
                </button>
              ${tailwindScreens
                  .map((ts) => twaBreakpointInputsCreator(ts.size, ts.name))
                  .join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${twaTitleCreator("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${twaRelativeButtonCreator("parent")}
              ${twaRelativeButtonCreator("child")}
              ${twaRelativeButtonCreator("prev")}
              ${twaRelativeButtonCreator("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${twaTitleCreator("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              
            <div>
              <button data-position="top-2,left-2" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="-0.75" y="0.75" width="28.5" height="20.5" transform="matrix(-1 0 0 1 29.5 1)" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M4 15.5625L15.5625 4L4 4L4 15.5625Z" fill="#475569"/>
                  </svg>                
                </span>
              </button>
            </div>
            
            <div>
              <button data-position="bottom-2,left-2" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30.25" y="22.25" width="28.5" height="20.5" transform="rotate(180 30.25 22.25)" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M4 8.4375L15.5625 20L4 20L4 8.4375Z" fill="#475569"/>
                  </svg>
                </span>
              </button>
            </div>
                      
            <div>
              <button data-position="top-2,right-2" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.75" y="1.75" width="28.5" height="20.5" stroke="#CBD5E1" stroke-width="1.5"/>
                    <path d="M28 15.5625L16.4375 4L28 4L28 15.5625Z" fill="#475569"/>
                  </svg>
                </span>
              </button>
            </div>
                 
            <div>
              <button data-position="bottom-2,right-2" class="bg-slate-100 p-1 rounded-md border-0">
                <span class="select-none">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.75" y="-0.75" width="28.5" height="20.5" transform="matrix(1 0 0 -1 1 21.5)" stroke="#CBD5E1" stroke-width="1.5"/>
                  <path d="M28 8.4375L16.4375 20L28 20L28 8.4375Z" fill="#475569"/>
                </svg>
                </span>
              </button>
            </div>
  
            </div>

            <p class="text-center text-[0.7rem] select-none mt-2 text-slate-600">
                Open element CSS information with <span class="font-medium">CMD + Click</span>.
            </p>

          </div>
        </div>
      </details>
    `;

export default popupHTML;    