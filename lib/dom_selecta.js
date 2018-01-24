/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
    this.nodes.forEach(node => {
      let parent = node.parentNode;
      parent.removeChild(node);
    });
    return this;
  }

  // DOMSelecta! EVENT HANDLERS

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



}




module.exports = DOMNodeCollection;
//


/***/ })
/******/ ]);