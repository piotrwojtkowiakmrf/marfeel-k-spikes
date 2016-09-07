require('./overrides');
require('./event-forwarder');
require('./amp-specifics');
const { ResizeableObjectLoader, sendResize } = require('./resizeable-object-loader');
const { TouchHandler } = require('./touch-handler');
const { MadsHandler } = require('./mads-handler');
const WindowEventManager = require('../common/window-event-manager');

WindowEventManager.register(window.parent);
const touchHandler = TouchHandler(document.querySelector('html'));
const madsHandler = MadsHandler(document.querySelector('.container'));
const { __PARENT_UUID__ } = window;

sendResize(5000);
window.addEventListener('load', () => sendResize());

const message = {
  scope: 'column',
  value: {
    type: 'isReady',
    data: {}
  }
};
WindowEventManager.propagate(message);
