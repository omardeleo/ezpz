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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  each(cb) {\n    this.nodes.forEach(cb);\n  }\n\n  html(html) {\n    if (typeof html === \"string\") {\n      this.each(node => {\n        node.innerHTML = html;\n      });\n      return this;\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html(\"\");\n    return this;\n  }\n\n  append(element) {\n    if (typeof element === \"string\") {\n      this.nodes.forEach(el => {\n        el.innerHTML += element;\n      });\n    } else if (typeof element === \"object\") {\n      let str = \"\";\n      element.nodes.forEach(el => {\n        str += el.outerHTML;\n      });\n      element.empty();\n      this.nodes.forEach(el => {\n        el.innerHTML += str;\n      });\n    }\n  }\n\n  attr(name) {\n    if (arguments.length > 1) {\n      this.nodes.forEach(node => {\n        node.attributes.item(name).value = arguments[1];\n      });\n      return this;\n    } else {\n      return this.nodes[0].attributes.getNamedItem(name).value;\n    }\n  }\n\n  addClass(className) {\n    this.each(node => node.classList.add(className));\n  }\n\n  removeClass(className) {\n    this.each(node => node.classList.remove(className));\n  }\n\n  toggleClass(className) {\n    this.each(node => node.classList.toggle(className))\n  }\n\n  // EZPZ Traversal\n\n  children() {\n    let children = [];\n    this.nodes.forEach(el => {\n      children = children.concat(Array.from(el.children));\n    });\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    let parent = [];\n    this.nodes.forEach(el => {\n      if (!parent.includes(el.parentNode)){\n        parent.push(el.parentNode);\n      }\n    });\n    return new DOMNodeCollection(parent);\n  }\n\n  find(element) {\n    let elements = [];\n    this.nodes.forEach(node => {\n      elements = elements.concat(Array.from(node.querySelectorAll(element)));\n    });\n\n    return new DOMNodeCollection(elements);\n  }\n\n  remove() {\n    this.nodes.forEach(node => {\n      let parent = node.parentNode;\n      parent.removeChild(node);\n    });\n    return this;\n  }\n\n  // EZPZ EVENT HANDLERS\n\n  on(eventName, callback) {\n     this.each((node) => {\n       node.addEventListener(eventName, callback);\n       const eventKey = `ezEvents-${eventName}`;\n       if (typeof node[eventKey] === \"undefined\") {\n         node[eventKey] = [];\n       }\n       node[eventKey].push(callback);\n     });\n   }\n\n   off(eventName) {\n     this.each((node) => {\n       const eventKey = `ezEvents-${eventName}`;\n       if (node[eventKey]) {\n         node[eventKey].forEach((callback) => {\n           node.removeEventListener(eventName, callback);\n         });\n       }\n       node[eventKey] = [];\n     });\n   }\n\n  ready(callback) {\n    if (document.readyState === \"complete\") {\n      callback();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", callback);\n    }\n    let dnc = new DOMNodeCollection(document);\n    return dnc;\n  }\n\n  css(property, value) {\n    this.each(node => node.style[property] = value);\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nconst _docReadyCallbacks = [];\nlet _docReady = false;\n\nwindow.$ez = (arg) => {\n  switch (typeof arg) {\n    case \"function\":\n      return registerDocReadyCallback(arg);\n    case \"string\":\n      return getNodesFromDom(arg);\n    case \"object\":\n      if (arg instanceof HTMLElement) {\n        return new DomNodeCollection([arg]);\n      }\n  }\n};\n\n$ez.extend = (base, ...otherObjs) => {\n  otherObjs.forEach((obj) => {\n    for (const prop in obj) {\n      base[prop] = obj[prop];\n    }\n  });\n  return base;\n};\n\n$ez.ajax = (options) => {\n  const request = new XMLHttpRequest();\n  const defaults = {\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    method: \"GET\",\n    url: \"\",\n    success: () => {},\n    error: () => {},\n    data: {},\n  };\n  options = $ez.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  if (options.method === \"GET\") {\n    options.url += `?${toQueryString(options.data)}`;\n  }\n\n  request.open(options.method, options.url, true);\n  request.onload = (e) => {\n    if (request.status === 200) {\n      options.success(request.response);\n    } else {\n      options.error(request.response);\n    }\n  };\n\n  request.send(JSON.stringify(options.data));\n};\n\ntoQueryString = (obj) => {\n  let result = \"\";\n  for (const prop in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, prop)) {\n      result += `${prop}=${obj[prop]}&`;\n    }\n  }\n  return result.substring(0, result.length - 1);\n};\n\nregisterDocReadyCallback = (func) => {\n  if (!_docReady) {\n    _docReadyCallbacks.push(func);\n  } else {\n    func();\n  }\n};\n\ngetNodesFromDom = (selector) => {\n  const nodes = document.querySelectorAll(selector);\n  const nodesArray = Array.from(nodes);\n  return new DomNodeCollection(nodesArray);\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  _docReady = true;\n  _docReadyCallbacks.forEach(func => func());\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });