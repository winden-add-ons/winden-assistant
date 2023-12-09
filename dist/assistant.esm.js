function v(){let t=document.createElement("script");t.setAttribute("src","https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"),document.head.appendChild(t)}function g(t){return{"2xl":[...t.classList].filter(s=>s.startsWith("2xl:")),xl:[...t.classList].filter(s=>s.startsWith("xl:")),lg:[...t.classList].filter(s=>s.startsWith("lg:")),md:[...t.classList].filter(s=>s.startsWith("md:")),sm:[...t.classList].filter(s=>s.startsWith("sm:")),dark:[...t.classList].filter(s=>s.startsWith("dark:"))}}function w(){let t=window.innerWidth,s={640:"sm",768:"md",1024:"lg",1280:"xl",1536:"2xl"},u=Object.keys(s).filter(r=>r<t).at(-1);return s[u]||"Default"}var a=(t,s)=>`
      <div>
        <input type="checkbox" id="${t}" name="${s}" checked class="sr-only peer" />

        <label
          for="${t}"
          class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center"
        >
          <span class="select-none">${s}</span>
        </label>
      </div>
    `,d=(t,s)=>`
    <div>
      <button data-position='${s}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center">
        <span class="select-none">${t}</span>
      </button>
    </div>
  `,c=t=>`
  <div>
    <button data-relative='${t}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-14 grid place-content-center">
      <span class="select-none">${t}</span>
    </button>
  </div>
`,p=t=>`
  <strong class="text-slate-400 font-medium text-sm select-none">
    ${t}
  </strong>
`;function b(){v();let t=document.createElement("div");t.innerHTML=`
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
            ${p("Edit Classes")}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            <p class="text-white">test</p>
            ${p("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${a("twaClasses2xl","2xl")}
              ${a("twaClassesXl","xl")}
              ${a("twaClassesLg","lg")}
              ${a("twaClassesMd","md")}
              ${a("twaClassesSm","sm")}
              ${a("twaClassesDark","dark")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${p("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${c("parent")}
              ${c("child")}
              ${c("prev")}
              ${c("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${p("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${d("tl",["top-4","left-4"])}
              ${d("tr",["top-4","right-4"])}
              ${d("bl",["bottom-4","left-4"])}
              ${d("br",["bottom-4","right-4"])}
            </div>
          </div>
        </div>
      </details>
    `,t.classList.add("fixed");let s=["right-4","bottom-4"];s.forEach(n=>t.classList.add(n)),document.body.appendChild(t);let u=document.getElementById("twaBreakpoint"),r=[...document.querySelectorAll('input[type="checkbox"]')],E=document.getElementById("twaClassesAdd"),l=document.getElementById("twaClassesEditor"),C=[...document.querySelectorAll("[data-position]")],k=[...document.querySelectorAll("[data-relative]")],x=document.getElementById("twaError"),e,m;document.addEventListener("click",n=>{let i=n.target;twaPopup.contains(i)||(twaPopup.open=!1),n.metaKey&&(n.preventDefault(),twaPopup.open=!0,e=i,u.innerText=w(),r.forEach(o=>o.checked=!0),l.value=e.className,m=g(e))}),r.forEach(n=>{n.addEventListener("input",()=>{m[n.name].forEach(i=>e.classList.toggle(i)),l.value=e.className})}),k.forEach(n=>{n.addEventListener("click",()=>{let i,o=n.getAttribute("data-relative");o==="parent"&&(i=e.parentElement?e.parentElement:e,!e.parentElement&&f("No parent element")),o==="prev"&&(i=e.previousElementSibling?e.previousElementSibling:e,!e.previousElementSibling&&f("No previous sibling element")),o==="next"&&(i=e.nextElementSibling?e.nextElementSibling:e,!e.nextElementSibling&&f("No next sibling element")),o==="child"&&(i=e.firstElementChild?e.firstElementChild:e,!e.firstElementChild&&f("No child element")),e=i,r.forEach($=>$.checked=!0),l.value=e.className,m=g(e)})}),l.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventItemDefault(),h(n))}),E.addEventListener("submit",n=>{h(n)});function h(n){n.preventDefault(),e.className=l.value,m=g(e)}window.addEventListener("resize",()=>{u.innerText=w()}),C.forEach(n=>{n.addEventListener("click",()=>{s.forEach(i=>t.classList.remove(i)),s=n.getAttribute("data-position").split(","),s.forEach(i=>t.classList.add(i))})});let f=n=>{x.removeAttribute("hidden"),x.innerText=n,setTimeout(()=>x.setAttribute("hidden",!0),3e3)}}var D=b;export{D as default};
