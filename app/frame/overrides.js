let prev = {};

const getParent = () =>
  window === window.parent ? prev : window.parent;

const getParentDoc = () =>
  getParent().document;

const defineProperty = (scope, name, desc) => {
  const save = {
    set (value) {
      console.log(name, value);
      prev[`_${name}`] = value;
    }
  };

  prev[name] = scope[name];
  Object.defineProperty(scope, name, Object.assign({}, desc, save));
};

const innerHeight = {
  get () {
    return getParent().innerHeight;
  }
};

const clientHeight = {
  get () {
    return getParentDoc().documentElement.clientHeight;
  }
};

const scrollTop = {
  get () {
    return getParentDoc().documentElement.scrollTop;
  }
};

const pageYOffset = {
  get () {
    return getParent().pageYOffset;
  }
};

defineProperty(window, 'innerHeight', innerHeight);
defineProperty(window, 'pageYOffset', pageYOffset);
defineProperty(document.documentElement, 'scrollTop', scrollTop);
defineProperty(document.documentElement, 'clientHeight', clientHeight);
