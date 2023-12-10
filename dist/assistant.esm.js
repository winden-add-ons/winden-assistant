function y(){let n=document.createElement("script");n.setAttribute("src","https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"),document.head.appendChild(n)}function h(n){let r=n.classList,a={};return tailwindScreens?.length&&tailwindScreens.forEach(l=>{switch(!0){case r.contains(l.name):a[l.name]=S(`${l.name}:`,r);break}}),a}function S(n,r){return[...r].filter(a=>a.startsWith(n))}function k(){let n=window.innerWidth,r=tailwindScreens?.length?tailwindScreens.sort((a,l)=>{let c=parseInt(a.size);return parseInt(l.size)-c}).find(a=>a.size.split("px")[0].trim()<=n):null;return r?r.name:"Default"}var A=(n,r)=>`
      <div>
        <input type="checkbox" id="${n}" name="${r}" checked class="sr-only peer" />

        <label
          for="${n}"
          class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center"
        >
          <span class="select-none">${r}</span>
        </label>
      </div>
    `,f=(n,r)=>`
    <div>
      <button data-position='${r}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-12 grid place-content-center">
        <span class="select-none">${n}</span>
      </button>
    </div>
  `,g=n=>`
  <div>
    <button data-relative='${n}' class="bg-slate-800 rounded-md text-xs font-medium hover:ring peer-focus:ring peer-focus:ring-indigo-500 text-white h-8 w-14 grid place-content-center">
      <span class="select-none">${n}</span>
    </button>
  </div>
`,v=n=>`
  <strong class="text-slate-400 font-medium text-sm select-none">
    ${n}
  </strong>
`;var x="tw-element-active";var L=()=>{[...document.querySelectorAll(`.${x}`)].forEach(n=>n.classList.remove(x))},p=n=>{L(),n.classList.add(x)};function B(){y();let n=setInterval(()=>{if(tailwindScreens?.length){let b=function(e){e.preventDefault(),t.className=u.value,d=h(t)};clearInterval(n);let r=document.createElement("div");r.innerHTML=`
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
            ${v("Edit Classes")}

            <textarea id="twaClassesEditor" rows="6" spellcheck="false" data-gramm="false" class="mt-1 border-slate-700 bg-slate-800 text-slate-300 rounded-md w-full text-sm focus:ring focus:ring-indigo-500 focus:outline-none focus:border-slate-700 resize-none"></textarea>

            <button class="bg-indigo-600 text-white rounded-md px-5 py-3 text-sm font-medium mt-2 w-full focus:outline-none focus:ring focus:ring-indigo-500 hover:ring hover:ring-indigo-600">
              <span class="select-none">Update</span>
            </button>
          </form>
        </div>

          <div>
            ${v("Toggle Breakpoints")}

            <fieldset class="flex flex-wrap gap-2 mt-1">
              ${tailwindScreens.map(e=>A(e.size,e.name)).join("")}
            </fieldset>

            <small class="text-xs font-medium text-slate-500 mt-1.5 block">
              Active Breakpoint: <span id="twaBreakpoint"></span>
            </small>
          </div>

          <div>
            ${v("Change Element")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${g("parent")}
              ${g("child")}
              ${g("prev")}
              ${g("next")}
            </div>

            <div id="twaError" class="mt-2 text-amber-500 text-sm font-medium select-none" hidden></div>
          </div>

          <div>
            ${v("Popup Position")}

            <div class="flex flex-wrap gap-2 mt-1">
              ${f("tl",["top-4","left-4"])}
              ${f("tr",["top-4","right-4"])}
              ${f("bl",["bottom-4","left-4"])}
              ${f("br",["bottom-4","right-4"])}
            </div>
          </div>
        </div>
      </details>
    `,r.classList.add("fixed");let a=["right-4","bottom-4"];a.forEach(e=>r.classList.add(e)),document.body.appendChild(r);let l=document.getElementById("twaBreakpoint"),c=[...document.querySelectorAll('input[type="checkbox"]')],C=document.getElementById("twaClassesAdd"),u=document.getElementById("twaClassesEditor"),$=[...document.querySelectorAll("[data-position]")],m=[...document.querySelectorAll("[data-relative]")],E=document.getElementById("twaError"),t,d;document.addEventListener("click",e=>{let i=e.target;twaPopup.contains(i)||(twaPopup.open=!1),e.metaKey&&(e.preventDefault(),twaPopup.open=!0,t=i,p(t),l.innerText=k(),c.forEach(s=>s.checked=!0),u.value=t.className,d=h(t))}),document.addEventListener("keydown",function(e){if(twaPopup.open&&e.metaKey){let i=e.key;if(i==="Enter")e.preventDefault(),b(e);else if(i>="1"&&i<="9"){if(Array.from(c)?.length){e.preventDefault();let s=c[parseInt(i)-1];if(s){let o=new Event("input");s.dispatchEvent(o)}else[...document.querySelectorAll('input[type="checkbox"]:focus')].forEach(o=>o.blur())}}else if(i==="ArrowLeft"){e.preventDefault();let s=m.find(o=>o.getAttribute("data-relative")==="prev");if(s){let o=new Event("click");s.dispatchEvent(o)}}else if(i==="ArrowUp"){e.preventDefault();let s=m.find(o=>o.getAttribute("data-relative")==="parent");if(s){let o=new Event("click");s.dispatchEvent(o)}}else if(i==="ArrowRight"){e.preventDefault();let s=m.find(o=>o.getAttribute("data-relative")==="next");if(s){let o=new Event("click");s.dispatchEvent(o)}}else if(i==="ArrowDown"){e.preventDefault();let s=m.find(o=>o.getAttribute("data-relative")==="child");if(s){let o=new Event("click");s.dispatchEvent(o)}}}}),c.forEach(e=>{e.addEventListener("input",()=>{(typeof d=="object"&&Object.keys(d)?.length||d?.length)&&(d[e.name].forEach(i=>t.classList.toggle(i)),u.value=t.className),e.focus()})}),m.forEach(e=>{e.addEventListener("click",()=>{let i,s=e.getAttribute("data-relative");s==="parent"&&(i=t.parentElement?t.parentElement:t,t.parentElement?p(t.parentElement):w("No parent element")),s==="prev"&&(i=t.previousElementSibling?t.previousElementSibling:t,t.previousElementSibling?p(t.previousElementSibling):w("No previous sibling element")),s==="next"&&(i=t.nextElementSibling?t.nextElementSibling:t,t.nextElementSibling?p(t.nextElementSibling):w("No next sibling element")),s==="child"&&(i=t.firstElementChild?t.firstElementChild:t,t.firstElementChild?p(t.firstElementChild):w("No child element")),t=i,c.forEach(o=>o.checked=!0),u.value=t.className,d=h(t)})}),u.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),b(e))}),C.addEventListener("submit",e=>{b(e)}),window.addEventListener("resize",()=>{l.innerText=k()}),$.forEach(e=>{e.addEventListener("click",()=>{a.forEach(i=>r.classList.remove(i)),a=e.getAttribute("data-position").split(","),a.forEach(i=>r.classList.add(i))})});let w=e=>{E.removeAttribute("hidden"),E.innerText=e,setTimeout(()=>E.setAttribute("hidden",!0),3e3)}}},100)}var O=B;export{O as default};
