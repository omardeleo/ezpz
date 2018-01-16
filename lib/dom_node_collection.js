class DOMNodeCollection {
  constructor(htmlelements) {
    this.htmlelements = htmlelements;
  }

  html(str) {
    if (arguments.length === 0) {
      return this.htmlelements[0].innerHTML;
    } else {
      this.htmlelements.forEach(el => {
        el.innerHTML = str;
      });
    }
  }

  empty() {
    this.html("");
    return this;
  }

  append(element) {
    if (typeof element === "string") {
      this.htmlelements.forEach(el => {
        el.innerHTML += element;
      });
    } else if (typeof element === "object") {
      let str = "";
      element.htmlelements.forEach(el => {
        str += el.outerHTML;
      });
      element.empty();
      this.htmlelements.forEach(el => {
        el.innerHTML += str;
      });
    }
  }

  attr(name) {
    if (arguments.length > 1) {
      // console.log(arguments);
      this.htmlelements.forEach(el => {
        el.attributes.item(name).value = arguments[1];
      });
      return this;
    } else {
      return this.htmlelements[0].attributes.getNamedItem(name).value;
    }
  }

  addClass(className) {
    this.htmlelements.forEach(el => {
      if (el.attributes.getNamedItem("class")) {
        el.attributes.getNamedItem("class").value += " " + className;
      } else {
        el.setAttribute("class", className);
      }
    });
    return this;
  }

  removeClass() {
    this.htmlelements.forEach(el => {
      el.attributes.getNamedItem("class").value = "";
    });
    return this;
  }

}


module.exports = DOMNodeCollection;
