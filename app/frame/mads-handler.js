const WindowEventManager = require('../common/window-event-manager');
const { ResizeableObjectLoader } = require('./resizeable-object-loader');

function MadsHandler(container) {
  const deferAdsLoader = () =>
    new Promise(resolve =>
      setTimeout(resolve, 2000));

  const detectActiveColumn = callback =>
    ({ type, data }) =>
      {
        if (
          type === "columnChanged"
          && data.currentColumnUuid === window.__UUID__
        ) {
          callback(data);
        }
      };

  const whenWindowReady = () =>
    new Promise(resolve =>
      window.addEventListener('load', resolve));

  const whenCurrentColumn = () =>
    new Promise(resolve =>
      WindowEventManager.on('column', detectActiveColumn(resolve)));

  const loadMads = (mads) =>
    mads.reduce((mads, element) =>
      [...mads, madLoader(element)], []);

  const madLoader = element =>
    {
      const img = document.createElement('img');
      img.src = element.dataset.src;
      element.appendChild(img);
      return ResizeableObjectLoader(done =>
        img.addEventListener('load', () => done(element)));
    }

  const getMads = (container) =>
    container ? Array.from(container.querySelectorAll('.mad')) : [];

  Promise
    .all([whenWindowReady(), whenCurrentColumn()])
    .then(deferAdsLoader)
    .then(() => getMads(container))
    .then((mads) => Promise.all(loadMads(mads)));
}

module.exports = { MadsHandler };
