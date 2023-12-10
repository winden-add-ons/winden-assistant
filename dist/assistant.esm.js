function k(){let o=document.createElement("script");o.setAttribute("src","https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"),document.head.appendChild(o)}function w(o){let r=o.classList,a={};return tailwindScreens?.length&&tailwindScreens.forEach(l=>{switch(!0){case r.contains(l.name):a[l.name]=A(`${l.name}:`,r);break}}),a}function A(o,r){return[...r].filter(a=>a.startsWith(o))}function E(){let o=window.innerWidth,r=tailwindScreens?.length?tailwindScreens.sort((a,l)=>{let c=parseInt(a.size);return parseInt(l.size)-c}).find(a=>a.size.split("px")[0].trim()<=o):null;return r?r.name:"Default"}var y=(o,r)=>`
      <div>
        <input type="checkbox" id="${o}" name="${r}" checked class="sr-only peer" />

        <label
          for="${o}"
          class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center"
        >
          <span class="select-none">${r}</span>
        </label>
      </div>
    `,f=(o,r)=>`
    <div>
      <button data-position='${r}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center">
        <span class="select-none">${o}</span>
      </button>
    </div>
  `,m=o=>`
  <div>
    <button data-relative='${o}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-14 grid place-content-center">
      <span class="select-none">${o}</span>
    </button>
  </div>
`,g=o=>`
  <strong class="text-slate-400 font-medium text-sm select-none">
    ${o}
  </strong>
`;function C(){k();let o=setInterval(()=>{if(tailwindScreens?.length){let x=function(e){e.preventDefault(),t.className=p.value,p.blur(),d=w(t)};clearInterval(o);let r=document.createElement("div");r.innerHTML=`
      <details id="twaPopup" class="relative bg-slate-900 shadow-lg rounded-lg group overflow-hidden max-w-sm open:w-screen">
        <summary class="flex items-center gap-1 justify-center h-10 w-10 group-open:h-12 group-open:w-full group-open:bg-slate-800/50 cursor-pointer text-white focus:ring focus:ring-inset focus:ring-indigo-500 focus:outline-none">
          <span class="select-none">
            \u{1F916}
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
            ${g("Edit Classes")}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            ${g("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${tailwindScreens.map(e=>y(e.size,e.name)).join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${g("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${m("parent")}
              ${m("child")}
              ${m("prev")}
              ${m("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${g("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${f("tl",["top-4","left-4"])}
              ${f("tr",["top-4","right-4"])}
              ${f("bl",["bottom-4","left-4"])}
              ${f("br",["bottom-4","right-4"])}
            </div>
          </div>
        </div>
      </details>
    `,r.classList.add("fixed");let a=["right-4","bottom-4"];a.forEach(e=>r.classList.add(e)),document.body.appendChild(r);let l=document.getElementById("twaBreakpoint"),c=[...document.querySelectorAll('input[type="checkbox"]')],b=document.getElementById("twaClassesAdd"),p=document.getElementById("twaClassesEditor"),B=[...document.querySelectorAll("[data-position]")],u=[...document.querySelectorAll("[data-relative]")],h=document.getElementById("twaError"),t,d;document.addEventListener("click",e=>{let n=e.target;twaPopup.contains(n)||(twaPopup.open=!1),e.metaKey&&(e.preventDefault(),twaPopup.open=!0,t=n,l.innerText=E(),c.forEach(i=>i.checked=!0),p.value=t.className,d=w(t))}),document.addEventListener("keydown",function(e){if(twaPopup.open&&e.metaKey){let n=e.key;if(n==="Enter")e.preventDefault(),x(e);else if(n>="1"&&n<="9"){if(Array.from(c)?.length){e.preventDefault();let i=c[parseInt(n)-1];if(i){let s=new Event("input");i.dispatchEvent(s)}else[...document.querySelectorAll('input[type="checkbox"]:focus')].forEach(s=>s.blur())}}else if(n==="ArrowLeft"){e.preventDefault();let i=u.find(s=>s.getAttribute("data-relative")==="prev");if(i){let s=new Event("click");i.dispatchEvent(s)}}else if(n==="ArrowUp"){e.preventDefault();let i=u.find(s=>s.getAttribute("data-relative")==="parent");if(i){let s=new Event("click");i.dispatchEvent(s)}}else if(n==="ArrowRight"){e.preventDefault();let i=u.find(s=>s.getAttribute("data-relative")==="next");if(i){let s=new Event("click");i.dispatchEvent(s)}}else if(n==="ArrowDown"){e.preventDefault();let i=u.find(s=>s.getAttribute("data-relative")==="child");if(i){let s=new Event("click");i.dispatchEvent(s)}}}}),c.forEach(e=>{e.addEventListener("input",()=>{(typeof d=="object"&&Object.keys(d)?.length||d?.length)&&(d[e.name].forEach(n=>t.classList.toggle(n)),p.value=t.className),e.focus()})}),u.forEach(e=>{e.addEventListener("click",()=>{let n,i=e.getAttribute("data-relative");i==="parent"&&(n=t.parentElement?t.parentElement:t,!t.parentElement&&v("No parent element")),i==="prev"&&(n=t.previousElementSibling?t.previousElementSibling:t,!t.previousElementSibling&&v("No previous sibling element")),i==="next"&&(n=t.nextElementSibling?t.nextElementSibling:t,!t.nextElementSibling&&v("No next sibling element")),i==="child"&&(n=t.firstElementChild?t.firstElementChild:t,!t.firstElementChild&&v("No child element")),t=n,c.forEach(s=>s.checked=!0),p.value=t.className,d=w(t)})}),p.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),x(e))}),b.addEventListener("submit",e=>{x(e)}),window.addEventListener("resize",()=>{l.innerText=E()}),B.forEach(e=>{e.addEventListener("click",()=>{a.forEach(n=>r.classList.remove(n)),a=e.getAttribute("data-position").split(","),a.forEach(n=>r.classList.add(n))})});let v=e=>{h.removeAttribute("hidden"),h.innerText=e,setTimeout(()=>h.setAttribute("hidden",!0),3e3)}}},100)}var N=C;export{N as default};
