const SCROLL_ELEMENT_SELECTOR = '-amp-scrollpos';

function attachMethods (element) {
  element.getBoundingClientRect = function () {
    return window.parent.document.documentElement.getBoundingClientRect();
  }
}

window.addEventListener('load', () => {
  const scrollElement = document.getElementById(SCROLL_ELEMENT_SELECTOR);

  if (scrollElement) {
    attachMethods(scrollElement);
  }
});
