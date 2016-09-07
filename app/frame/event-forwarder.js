const WindowEventManager = require('../common/window-event-manager');
const { __PARENT__UUID, CustomEvent } = window;
const EVENT_SCROLL = 'scroll';

const createScrollEvent = ({ scrollTop, view }) =>
  new Event('scroll', { bubbles: true });

function onWindow({ type, data }) {
  if (data.pocket.currentColumnUuid !== __UUID__) {
    return;
  }

  switch (type) {
    case EVENT_SCROLL:
      const { scrollTop } = data;
      window.document.body.dispatchEvent(createScrollEvent({ scrollTop, view: document }));
      break;
    default:
      return;
  };
}

WindowEventManager.onUuid(__PARENT__UUID, 'window', onWindow);
