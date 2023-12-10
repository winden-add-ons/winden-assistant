import { relativeElementActiveClass } from './constant.js'

export const removeTWActiveClass = () => {
  [...document.querySelectorAll(`.${relativeElementActiveClass}`)].forEach(twea => twea.classList.remove(relativeElementActiveClass));
}

export const addTWActiveClass = (element) => {
  removeTWActiveClass();
  element.classList.add(relativeElementActiveClass);
}