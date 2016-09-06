const { ResizeableObjectLoader, sendResize } = require('./resizeable-object-loader');
const { TouchHandler } = require('./touch-handler');
const { MadsHandler } = require('./mads-handler');
const WindowEventManager = require('../common/window-event-manager');

WindowEventManager.register(window.parent);
const touchHandler = TouchHandler(document.querySelector('html'));
const madsHandler = MadsHandler(document.querySelector('.container'));

sendResize();
ResizeableObjectLoader(done => window.addEventListener('load', done));
WindowEventManager.on('window', ({ type, data }) => {
  if (data.pocket.currentColumnUuid !== window.__UUID__) {
    return false;
  }

  switch (type) {
    case 'scroll':
      console.log(data);
  }
});
const message = {
  scope: 'column',
  value: {
    type: 'isReady',
    data: {}
  }
};
WindowEventManager.propagate(message);