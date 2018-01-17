const DOMNodeCollection = require('./dom_node_collection');

window.$ds = function(selector) {
  let dnc;
  if (typeof selector === HTMLElement) {
    dnc = new DOMNodeCollection([selector]);
    return dnc;
  }


  let elementList = Array.from(document.querySelectorAll(selector));
  dnc = new DOMNodeCollection(elementList);
  return dnc;
};
