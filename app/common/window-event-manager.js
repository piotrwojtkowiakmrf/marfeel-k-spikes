const EventEmitter = require('events');

function WindowEventManager(global) {
  const scopes = [];
  const currentScopeUuid = typeof global.__UUID__ === "undefined" ? -1 : global.__UUID__;
  const emitter = new EventEmitter();
  let pocket = {};

  global.addEventListener('message', onMessage, false);

  const on = (...args) =>
    emitter.on(...args);

  const nameGen = (name, uuid) =>
    `${name}_${uuid}`;

  const onUuid = (uuid, eventScope, handler) =>
    on(nameGen(eventScope, uuid), handler);

  const send = (scope, message) =>
    scope.postMessage(message, window.location.origin);

  const setPocket = (key, value) =>
    pocket[key] = value;

  function onMessage(event) {
    let data = event.data;

    if (typeof event.data === 'string') {
      data = JSON.parse(data);
    }

    const { scope: eventScope, uuid, value } = data;
    emitter.emit(eventScope, value);
    emitter.emit(nameGen(eventScope, uuid), value);
  }

  function propagate(message) {
    message.uuid = currentScopeUuid;
    message.value.data.pocket = pocket;
    scopes.forEach(({ scope }) => send(scope, message));
  }

  function register(scope) {
    const uuid = scope.__UUID__;
    scopes.push({ uuid, scope});
  }

  return { on, onUuid, propagate, register, setPocket };
}

module.exports = WindowEventManager(window);
