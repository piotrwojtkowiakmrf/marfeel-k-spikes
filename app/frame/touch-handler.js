const WindowEventManager = require('../common/window-event-manager');

function TouchHandler(touchEventTarget) {
  touchEventTarget.addEventListener('touchstart', forwardEvent, false);
  touchEventTarget.addEventListener('touchend', forwardEvent, false);
  touchEventTarget.addEventListener('touchmove', forwardEvent, false);

  function forwardEvent({ type, touches = [] }) {

    const [touch] = Array.from(touches);
    const {
      screenX: posX = 0
    } = touch || {};
    const message = {
      scope: 'touchEvent',
      value: {
        type: type,
        data: { posX }
      }
    };

    WindowEventManager.propagate(message);
  }
}

module.exports = { TouchHandler };
