function SwipeManager(columns, initialX) {
  const currentIndex = columns.findIndex(c => c.isCurrent());
  const nextIndex = getSiblingIndex(currentIndex, true);
  const previousIndex = getSiblingIndex(currentIndex, false);
  const screenSize = window.outerWidth;
  let lastX = 0;
  let direction = 0;

  function toPosition(x) {
    const pos = x - initialX;
    const nextPos = pos + screenSize;
    const prevPos = pos - screenSize;

    getColumn(currentIndex).setPosition(pos);
    getColumn(nextIndex).setPosition(nextPos);
    getColumn(previousIndex).setPosition(prevPos);
    lastX = x;
  }

  function getSiblingIndex(index, next) {
    if (next) {
      return columns[index + 1] ? index + 1 : 0;
    } else {
      return columns[index - 1] ? index - 1 : columns.length - 1;
    }
  }

  function getColumn(index) {
    return columns[index];
  }

  function getDirection(x) {
    let result;

    if (x < initialX) result = 1;
    else if (x > initialX) result = -1;
    else result = 0;

    return result;
  }

  function end() {
    const alignPoint = screenSize * 0.3;

    if (Math.abs(getColumn(currentIndex).getPosition()) < alignPoint) {
      getColumn(currentIndex).setPosition(0);
      getColumn(nextIndex).setPosition(screenSize);
      getColumn(previousIndex).setPosition(-screenSize);
    } else {
      let nextColumnIndex = null;

      if (getDirection(lastX) === -1) {
        nextColumnIndex = previousIndex;
      } else {
        nextColumnIndex = nextIndex;
      }

      getColumn(nextColumnIndex).setPosition(0);
      getColumn(getSiblingIndex(nextColumnIndex, true)).setPosition(screenSize);
      getColumn(getSiblingIndex(nextColumnIndex, false)).setPosition(-screenSize);
      getColumn(currentIndex).setCurrent(false);
      getColumn(nextColumnIndex).setCurrent(true);
    }
  }

  return { toPosition, end };
}

module.exports = { SwipeManager };
