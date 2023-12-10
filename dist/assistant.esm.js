function E(){let n=document.createElement("script");n.setAttribute("src","https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"),document.head.appendChild(n)}function g(n){let s=n.classList,o={};return tailwindScreens?.length&&tailwindScreens.forEach(a=>{switch(!0){case s.contains(a.name):o[a.name]=$(`${a.name}:`,s);break}}),o}function $(n,s){return[...s].filter(o=>o.startsWith(n))}function h(){let n=window.innerWidth,s=tailwindScreens?.length?tailwindScreens.sort((o,a)=>{let c=parseInt(o.size);return parseInt(a.size)-c}).find(o=>o.size.split("px")[0].trim()<=n):null;return s?s.name:"Default"}var b=(n,s)=>`
      <div>
        <input type="checkbox" id="${n}" name="${s}" checked class="sr-only peer" />

        <label
          for="${n}"
          class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center"
        >
          <span class="select-none">${s}</span>
        </label>
      </div>
    `,p=(n,s)=>`
    <div>
      <button data-position='${s}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center">
        <span class="select-none">${n}</span>
      </button>
    </div>
  `,u=n=>`
  <div>
    <button data-relative='${n}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-14 grid place-content-center">
      <span class="select-none">${n}</span>
    </button>
  </div>
`,m=n=>`
  <strong class="text-slate-400 font-medium text-sm select-none">
    ${n}
  </strong>
`;function k(){E();let n=setInterval(()=>{if(tailwindScreens?.length){let v=function(e){e.preventDefault(),t.className=d.value,r=g(t)};clearInterval(n);let s=document.createElement("div");s.innerHTML=`
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
            ${m("Edit Classes")}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            ${m("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${tailwindScreens.map(e=>b(e.size,e.name)).join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${m("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${u("parent")}
              ${u("child")}
              ${u("prev")}
              ${u("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${m("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${p("tl",["top-4","left-4"])}
              ${p("tr",["top-4","right-4"])}
              ${p("bl",["bottom-4","left-4"])}
              ${p("br",["bottom-4","right-4"])}
            </div>
          </div>
        </div>
      </details>
    `,s.classList.add("fixed");let o=["right-4","bottom-4"];o.forEach(e=>s.classList.add(e)),document.body.appendChild(s);let a=document.getElementById("twaBreakpoint"),c=[...document.querySelectorAll('input[type="checkbox"]')],x=document.getElementById("twaClassesAdd"),d=document.getElementById("twaClassesEditor"),C=[...document.querySelectorAll("[data-position]")],y=[...document.querySelectorAll("[data-relative]")],w=document.getElementById("twaError"),t,r;document.addEventListener("click",e=>{let i=e.target;twaPopup.contains(i)||(twaPopup.open=!1),e.metaKey&&(e.preventDefault(),twaPopup.open=!0,t=i,a.innerText=h(),c.forEach(l=>l.checked=!0),d.value=t.className,r=g(t))}),c.forEach(e=>{e.addEventListener("input",()=>{(typeof r=="object"&&Object.keys(r)?.length||r?.length)&&r[e.name].forEach(i=>t.classList.toggle(i)),d.value=t.className})}),y.forEach(e=>{e.addEventListener("click",()=>{let i,l=e.getAttribute("data-relative");l==="parent"&&(i=t.parentElement?t.parentElement:t,!t.parentElement&&f("No parent element")),l==="prev"&&(i=t.previousElementSibling?t.previousElementSibling:t,!t.previousElementSibling&&f("No previous sibling element")),l==="next"&&(i=t.nextElementSibling?t.nextElementSibling:t,!t.nextElementSibling&&f("No next sibling element")),l==="child"&&(i=t.firstElementChild?t.firstElementChild:t,!t.firstElementChild&&f("No child element")),t=i,c.forEach(B=>B.checked=!0),d.value=t.className,r=g(t)})}),d.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventItemDefault(),v(e))}),x.addEventListener("submit",e=>{v(e)}),window.addEventListener("resize",()=>{a.innerText=h()}),C.forEach(e=>{e.addEventListener("click",()=>{o.forEach(i=>s.classList.remove(i)),o=e.getAttribute("data-position").split(","),o.forEach(i=>s.classList.add(i))})});let f=e=>{w.removeAttribute("hidden"),w.innerText=e,setTimeout(()=>w.setAttribute("hidden",!0),3e3)}}},100)}var D=k;export{D as default};
