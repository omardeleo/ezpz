class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html() {
    if (arguments.length === 0) {
      return this.nodes[0].innerHTML;
    } else if (typeof arguments[0] === "string") {
      this.nodes.forEach(el => {
        el.innerHTML = arguments[0];
      });
      return this;
    } else if (typeof arguments[0] === "function") {
      this.nodes.forEach(el => {
        el.innerHTML = arguments[0]();
      });
      return this;
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
      // console.log(arguments);
      this.nodes.forEach(el => {
        el.attributes.item(name).value = arguments[1];
      });
      return this;
    } else {
      return this.nodes[0].attributes.getNamedItem(name).value;
    }
  }

  addClass(className) {
    this.nodes.forEach(el => {
      if (el.attributes.getNamedItem("class")) {
        el.attributes.getNamedItem("class").value += " " + className;
      } else {
        el.setAttribute("class", className);
      }
    });
    return this;
  }

  removeClass() {
    this.nodes.forEach(el => {
      el.attributes.getNamedItem("class").value = "";
    });
    return this;
  }

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
      console.log(el.parentNode);
      if (!parent.includes(el.parentNode)){
        parent.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(parent);
  }

  find(element) {
    let elements = [];
    this.nodes.forEach(el => {
      elements = elements.concat(Array.from(el.querySelectorAll(element)));
    });

    return new DOMNodeCollection(elements);
  }

  remove() {
    this.nodes.forEach(el => {
      let parent = el.parentNode;
      parent.removeChild(el);
    });
    return this;
  }
}


module.exports = DOMNodeCollection;
