import { relativeElementActiveClass, twaIframeId } from './constant.js'

export const isTWAIframe = () => {
  const iframe = document.querySelector(`#${twaIframeId}`);
  if (iframe && iframe.contentWindow) {
    const iframeDocument = iframe?.contentWindow?.document;
    if(iframeDocument) {
      return true;
    }
  }
  return false;
};

export const getTWAIframeDocument = () => {
  const iframe = document.querySelector(`#${twaIframeId}`);
  if (iframe && iframe.contentWindow) {
    const iframeDocument = iframe?.contentWindow?.document;
    if(iframeDocument) {
      return iframeDocument;
    }
  }
  return null;
};

export const removeTWActiveClass = () => {
  let _document = document;
  if(isTWAIframe()) {
    _document = getTWAIframeDocument();
  }
  [..._document.querySelectorAll(`.${relativeElementActiveClass}`)].forEach(twea => twea.classList.remove(relativeElementActiveClass));
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
  if (!_classes.find(c => c === relativeElementActiveClass)) {
    _classes.push(relativeElementActiveClass)
  }
  return _classes.join(' ');
}