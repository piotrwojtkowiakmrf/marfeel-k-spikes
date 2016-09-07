const WindowEventManager = require('../common/window-event-manager');
let columnUuid = 0;

function ColumnManager(element) {
  const __UUID__ = columnUuid++;
  const __PARENT_UUID__ = window.__UUID__;
  const frame = element.querySelector('.column-frame');
  const { contentWindow: column } = frame;

  let position = 0;
  let scrollTop = 0;
  let isCurrentFlag = element.classList.contains('current');

  element.dataset.uuid = __UUID__;
  element.style.width = `${window.outerWidth}px`;
  frame.width = window.outerWidth;
  column.__UUID__ = __UUID__;
  column.__PARENT_UUID__ = __PARENT_UUID__;
  WindowEventManager.register(column);
  WindowEventManager.onUuid(__UUID__, 'column', columnHandler);

  const getPosition = () => position;

  const isCurrent = () => isCurrentFlag;

  function columnHandler({ type, data }) {
    switch (type) {
      case 'isReady':
        if (isCurrentFlag) {
          sendColumnChanged();
        }
        break;
      case 'resize':
        updateIframeSize(data);
        break;
    }
  };

  function updateIframeSize({ height }) {
    frame.height = height;
  }

  function setPosition(x) {
    position = x;

    if (x === 0) {
      element.style.transform = 'none';
    } else {
      element.style.transform = `translate3d(${x}px, 0, 0)`;
    }
  }

  function sendColumnChanged() {
    const message = {
      scope: 'column',
      value: {
        type: 'columnChanged',
        data: { currentColumnUuid: __UUID__ }
      }
    };

    WindowEventManager.setPocket('currentColumnUuid', __UUID__);
    WindowEventManager.propagate(message);
  }

  function setCurrent(value) {
    if (value) {
      element.classList.add('current');
      sendColumnChanged();
    } else {
      element.classList.remove('current');
    }

    isCurrentFlag = value;
  }

  function swipeEnd() {
    if (isCurrent()) {
      element.style.transform = 'none';
    }
  }

  return { setPosition, getPosition, isCurrent, setCurrent, swipeEnd };
}

module.exports = { ColumnManager };
