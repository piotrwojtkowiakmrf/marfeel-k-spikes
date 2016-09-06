const { ColumnManager } = require('./column-manager');
const { SwipeManager } = require('./swipe-manager');
const WindowEventManager = require('../common/window-event-manager');

function ViewNavigator(element) {
  const columns = Array
    .from(element.querySelectorAll('.column'))
    .map(setupColumn);
  let swipeManager = null;

  WindowEventManager.on('touchEvent', handleTouchEvent);
  window.addEventListener('scroll', ({ target: { body }}) => {
    const { scrollTop } = body;
    const message = {
      scope: 'window',
      value: {
        type: 'scroll',
        data: { scrollTop }
      }
    };

    WindowEventManager.propagate(message);
  }, false);

  function handleTouchEvent({ type, data }) {
    const { posX } = data;

    switch (type) {
      case 'touchstart':
        swipeManager = SwipeManager(columns, posX);
        break;
      case 'touchmove':
        swipeManager.toPosition(posX);
        break;
      case 'touchend':
        swipeManager.end();
        swipeManager = null;
        columns.forEach(c => c.swipeEnd());
    }
  }

  function setupColumn(column, index) {
    const position = index * window.outerWidth;
    const manager = ColumnManager(column);

    manager.setPosition(position);
    return manager;
  }
}

module.exports = { ViewNavigator };
