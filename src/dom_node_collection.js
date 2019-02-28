class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === "string") {
      this.each(node => {
        node.innerHTML = html;
      });
      return this;
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html("");
    return this;
  }

  append(element) {
    if (typeof element === "string") {
      this.nodes.forEach(el => {
        el.innerHTML += element;
      });
    } else if (typeof element === "object") {
      let str = "";
      element.nodes.forEach(el => {
        str += el.outerHTML;
      });
      element.empty();
      this.nodes.forEach(el => {
        el.innerHTML += str;
      });
    }
  }

  attr(name) {
    if (arguments.length > 1) {
      this.nodes.forEach(node => {
        node.attributes.item(name).value = arguments[1];
      });
      return this;
    } else {
      return this.nodes[0].attributes.getNamedItem(name).value;
    }
  }

  addClass(className) {
    this.each(node => node.classList.add(className));
  }

  removeClass(className) {
    this.each(node => node.classList.remove(className));
  }

  toggleClass(className) {
    this.each(node => node.classList.toggle(className))
  }



  // EZPZ Traversal

  children() {
    let children = [];
    this.nodes.forEach(el => {
      children = children.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parent = [];
    this.nodes.forEach(el => {
      if (!parent.includes(el.parentNode)){
        parent.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(parent);
  }

  find(element) {
    let elements = [];
    this.nodes.forEach(node => {
      elements = elements.concat(Array.from(node.querySelectorAll(element)));
    });

    return new DOMNodeCollection(elements);
  }

  remove() {
    this.nodes.forEach(node => {
      let parent = node.parentNode;
      parent.removeChild(node);
    });
    return this;
  }

  // EZPZ EVENT HANDLERS

  on() {
    this.nodes.forEach(node => {
      node.addEventListener(arguments[0], arguments[1]);
      node.callback = arguments[1];
    });
    return this;
  }

  off() {
    this.nodes.forEach(node => {
      node.removeEventListener(arguments[0], node.callback);
      node.callback = null;
    });
    return this;
  }

  ready(callback) {
    if (document.readyState === "complete") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
    let dnc = new DOMNodeCollection(document);
    return dnc;
  }

  css(property, value) {
    this.each(node => node.style[property] = value);
  }
}

module.exports = DOMNodeCollection;
