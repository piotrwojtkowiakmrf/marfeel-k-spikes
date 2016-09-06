const WindowEventManager = require('../common/window-event-manager');

function sendResize() {
  const { offsetHeight, scrollHeight, clientHeight } = document.body;
  const message = {
    scope: 'column',
    value: {
      type: 'resize',
      data: {
        height: Math.max(offsetHeight, scrollHeight, clientHeight)
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
