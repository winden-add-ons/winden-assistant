function A(){let n=document.createElement("script");n.setAttribute("src","https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"),document.head.appendChild(n)}function x(n){let s=n.classList,o={};return tailwindScreens?.length&&tailwindScreens.forEach(l=>{switch(!0){case s.contains(l.name):o[l.name]=L(`${l.name}:`,s);break}}),o}function L(n,s){return[...s].filter(o=>o.startsWith(n))}function k(){let n=window.innerWidth,s=tailwindScreens?.length?tailwindScreens.sort((o,l)=>{let c=parseInt(o.size);return parseInt(l.size)-c}).find(o=>o.size.split("px")[0].trim()<=n):null;return s?s.name:"Default"}var B=(n,s)=>`
      <div>
        <input type="checkbox" id="${n}" name="${s}" checked class="sr-only peer" />

        <label
          for="${n}"
          class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center"
        >
          <span class="select-none">${s}</span>
        </label>
      </div>
    `,g=(n,s)=>`
    <div>
      <button data-position='${s}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center">
        <span class="select-none">${n}</span>
      </button>
    </div>
  `,v=n=>`
  <div>
    <button data-relative='${n}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-14 grid place-content-center">
      <span class="select-none">${n}</span>
    </button>
  </div>
`,w=n=>`
  <strong class="text-slate-400 font-medium text-sm select-none">
    ${n}
  </strong>
`;var p="tw-element-active";var z=()=>{[...document.querySelectorAll(`.${p}`)].forEach(n=>n.classList.remove(p))},u=n=>{z(),n.classList.add(p)},E=n=>n.split(" ").filter(s=>s!==p).join(" "),$=n=>{let s=n.split(" ");return s.find(o=>o===p)||s.push(p),s.join(" ")};function S(){A();let n=setInterval(()=>{if(tailwindScreens?.length){let C=function(e){e.preventDefault(),t.className=$(m.value),d=x(t)};clearInterval(n);let s=document.createElement("div");s.innerHTML=`
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
            ${w("Edit Classes")}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            ${w("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${tailwindScreens.map(e=>B(e.size,e.name)).join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${w("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${v("parent")}
              ${v("child")}
              ${v("prev")}
              ${v("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${w("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${g("tl",["top-4","left-4"])}
              ${g("tr",["top-4","right-4"])}
              ${g("bl",["bottom-4","left-4"])}
              ${g("br",["bottom-4","right-4"])}
            </div>
          </div>
        </div>
      </details>
    `,s.classList.add("fixed");let o=["right-4","bottom-4"];o.forEach(e=>s.classList.add(e)),document.body.appendChild(s);let l=document.getElementById("twaBreakpoint"),c=[...document.querySelectorAll('input[type="checkbox"]')],y=document.getElementById("twaClassesAdd"),m=document.getElementById("twaClassesEditor"),T=[...document.querySelectorAll("[data-position]")],f=[...document.querySelectorAll("[data-relative]")],b=document.getElementById("twaError"),t,d;document.addEventListener("click",e=>{let i=e.target;twaPopup.contains(i)||(twaPopup.open=!1),e.metaKey&&(e.preventDefault(),twaPopup.open=!0,t=i,u(t),l.innerText=k(),c.forEach(a=>a.checked=!0),m.value=E(t.className),d=x(t))}),document.addEventListener("keydown",function(e){if(twaPopup.open&&e.metaKey){let i=e.key;if(i==="Enter")e.preventDefault(),C(e);else if(i>="1"&&i<="9"){if(Array.from(c)?.length){e.preventDefault();let a=c[parseInt(i)-1];if(a){let r=new Event("input");a.dispatchEvent(r)}else[...document.querySelectorAll('input[type="checkbox"]:focus')].forEach(r=>r.blur())}}else if(i==="ArrowLeft"){e.preventDefault();let a=f.find(r=>r.getAttribute("data-relative")==="prev");if(a){let r=new Event("click");a.dispatchEvent(r)}}else if(i==="ArrowUp"){e.preventDefault();let a=f.find(r=>r.getAttribute("data-relative")==="parent");if(a){let r=new Event("click");a.dispatchEvent(r)}}else if(i==="ArrowRight"){e.preventDefault();let a=f.find(r=>r.getAttribute("data-relative")==="next");if(a){let r=new Event("click");a.dispatchEvent(r)}}else if(i==="ArrowDown"){e.preventDefault();let a=f.find(r=>r.getAttribute("data-relative")==="child");if(a){let r=new Event("click");a.dispatchEvent(r)}}}}),c.forEach(e=>{e.addEventListener("input",()=>{(typeof d=="object"&&Object.keys(d)?.length||d?.length)&&(d[e.name].forEach(i=>t.classList.toggle(i)),m.value=E(t.className)),e.focus()})}),f.forEach(e=>{e.addEventListener("click",()=>{let i,a=e.getAttribute("data-relative");a==="parent"&&(i=t.parentElement?t.parentElement:t,t.parentElement?u(t.parentElement):h("No parent element")),a==="prev"&&(i=t.previousElementSibling?t.previousElementSibling:t,t.previousElementSibling?u(t.previousElementSibling):h("No previous sibling element")),a==="next"&&(i=t.nextElementSibling?t.nextElementSibling:t,t.nextElementSibling?u(t.nextElementSibling):h("No next sibling element")),a==="child"&&(i=t.firstElementChild?t.firstElementChild:t,t.firstElementChild?u(t.firstElementChild):h("No child element")),t=i,c.forEach(r=>r.checked=!0),m.value=E(t.className),d=x(t)})}),m.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),C(e))}),y.addEventListener("submit",e=>{C(e)}),window.addEventListener("resize",()=>{l.innerText=k()}),T.forEach(e=>{e.addEventListener("click",()=>{o.forEach(i=>s.classList.remove(i)),o=e.getAttribute("data-position").split(","),o.forEach(i=>s.classList.add(i))})});let h=e=>{b.removeAttribute("hidden"),b.innerText=e,setTimeout(()=>b.setAttribute("hidden",!0),3e3)}}},100)}var F=S;export{F as default};
