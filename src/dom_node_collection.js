class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html() {
    if (arguments.length === 0) {
      return this.nodes[0].innerHTML;
    } else if (typeof arguments[0] === "string") {
      this.nodes.forEach(node => {
        node.innerHTML = arguments[0];
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
      this.nodes.forEach(node => {
        node.attributes.item(name).value = arguments[1];
      });
      return this;
    } else {
      return this.nodes[0].attributes.getNamedItem(name).value;
    }
  }

  addClass(className) {
    this.nodes.forEach(node => {
      if (node.attributes.getNamedItem("class")) {
        node.attributes.getNamedItem("class").value += " " + className;
      } else {
        node.setAttribute("class", className);
      }
    });
    return this;
  }

  removeClass() {
    if (typeof arguments[0] === "string") {
      let remClasses = arguments[0].split(" ");
      this.nodes.forEach(node => {
        let classValues = node.attributes.class.value.split(" ");
        remClasses.forEach(remClass => {
          if (classValues.includes(remClass)){
            classValues.splice(classValues.indexOf(remClass), 1);
          }
        });
        node.attributes.class.value = classValues.join(" ");
        if (node.attributes.class.value === "") {
          node.removeAttribute("class");
        }
      });
    } else if (typeof arguments[0] === "function") {
      this.removeClass(arguments[0]());
    }
    return this;
  }

  // EZPZ! Traversal

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
      // console.log(el.parentNode);
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

  // EZPZ! EVENT HANDLERS

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

}

module.exports = DOMNodeCollection;