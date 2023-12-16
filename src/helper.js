import { relativeElementActiveClass } from './constant.js'

export const removeTWActiveClass = () => {
  [...document.querySelectorAll(`.${relativeElementActiveClass}`)].forEach(twea => twea.classList.remove(relativeElementActiveClass));
}

export const addTWActiveClass = (element) => {
  removeTWActiveClass();
  element.classList.add(relativeElementActiveClass);
}

export const normalizeTextareaClasses = (classes) => {
  return classes.split(' ').filter(c => c !== relativeElementActiveClass).join(' ');
}

export const deNormalizeTextareaClasses = (classes) => {
  const _classes = classes.split(' ');
  if(!_classes.find(c => c === relativeElementActiveClass)) {
    _classes.push(relativeElementActiveClass)
  }
  return _classes.join(' ');
}