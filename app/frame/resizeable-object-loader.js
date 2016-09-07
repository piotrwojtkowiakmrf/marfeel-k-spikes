const WindowEventManager = require('../common/window-event-manager');

const getSize = () => {
  const { offsetHeight, scrollHeight, clientHeight } = document.body;
  return Math.max(offsetHeight, scrollHeight, clientHeight)
}

function sendResize(height = getSize()) {
  const message = {
    scope: 'column',
    value: {
      type: 'resize',
      data: {
        height: height
      }
    }
  };

  WindowEventManager.propagate(message);
}

function ResizeableObjectLoader (consumer) {
  return new Promise(resolve => consumer(resolve))
    .then((result) => {
      sendResize();
      return Promise.resolve(result);
    });
}

module.exports = { ResizeableObjectLoader, sendResize };
