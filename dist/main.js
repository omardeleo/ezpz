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

eval("class DOMNodeCollection {\n  constructor(nodes) {\n    this.nodes = nodes;\n  }\n\n  each(cb) {\n    this.nodes.forEach(cb);\n  }\n\n  html(html) {\n    if (typeof html === \"string\") {\n      this.each(node => {\n        node.innerHTML = html;\n      });\n      return this.nodes;\n    } else if (this.nodes.length > 0) {\n      return this.nodes[0].innerHTML;\n    }\n  }\n\n  empty() {\n    this.html(\"\");\n    return this;\n  }\n\n  append(element) {\n    if (typeof element === \"string\") {\n      this.nodes.forEach(el => {\n        el.innerHTML += element;\n      });\n    } else if (typeof element === \"object\") {\n      let str = \"\";\n      element.nodes.forEach(el => {\n        str += el.outerHTML;\n      });\n      element.empty();\n      this.nodes.forEach(el => {\n        el.innerHTML += str;\n      });\n    }\n  }\n\n  attr(name) {\n    if (arguments.length > 1) {\n      this.nodes.forEach(node => {\n        node.attributes.item(name).value = arguments[1];\n      });\n      return this;\n    } else {\n      return this.nodes[0].attributes.getNamedItem(name).value;\n    }\n  }\n\n  addClass(className) {\n    this.each(node => node.classList.add(className));\n  }\n\n  removeClass(className) {\n    this.each(node => node.classList.remove(className));\n  }\n\n  toggleClass(className) {\n    this.each(node => node.classList.toggle(className))\n  }\n\n  // EZPZ! Traversal\n\n  children() {\n    let children = [];\n    this.nodes.forEach(el => {\n      children = children.concat(Array.from(el.children));\n    });\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    let parent = [];\n    this.nodes.forEach(el => {\n      // console.log(el.parentNode);\n      if (!parent.includes(el.parentNode)){\n        parent.push(el.parentNode);\n      }\n    });\n    return new DOMNodeCollection(parent);\n  }\n\n  find(element) {\n    let elements = [];\n    this.nodes.forEach(node => {\n      elements = elements.concat(Array.from(node.querySelectorAll(element)));\n    });\n\n    return new DOMNodeCollection(elements);\n  }\n\n  remove() {\n    this.nodes.forEach(node => {\n      let parent = node.parentNode;\n      parent.removeChild(node);\n    });\n    return this;\n  }\n\n  // EZPZ! EVENT HANDLERS\n\n  on() {\n    this.nodes.forEach(node => {\n      node.addEventListener(arguments[0], arguments[1]);\n      node.callback = arguments[1];\n    });\n    return this;\n  }\n\n  off() {\n    this.nodes.forEach(node => {\n      node.removeEventListener(arguments[0], node.callback);\n      node.callback = null;\n    });\n    return this;\n  }\n\n  ready(callback) {\n    if (document.readyState === \"complete\") {\n      callback();\n    } else {\n      document.addEventListener(\"DOMContentLoaded\", callback);\n    }\n    let dnc = new DOMNodeCollection(document);\n    return dnc;\n  }\n\n  css(property, value) {\n    this.each(node => node.style[property] = value);\n    console.log(this.nodes);\n  }\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\nlet domLoaded = false;\nlet domLoadedCallbacks = [];\n\nwindow.$ez = function(arg) {\n  let dnc;\n  if (typeof arg === HTMLElement) {\n    dnc = new DOMNodeCollection([arg]);\n  } else if (typeof arg === \"function\") {\n    checkDomLoaded(arg);\n    dnc = new DOMNodeCollection(document);\n  } else if (arg === document) {\n    dnc = new DOMNodeCollection(document);\n  } else {\n    let nodeList = Array.from(document.querySelectorAll(arg));\n    dnc = new DOMNodeCollection(nodeList);\n  }\n\n  return dnc;\n};\n\n$ez.extend = (obj1, ...obj2) => {\n  for (let i = 0; i < obj2.length; i++) {\n    let obj = obj2[i];\n    for (let property in obj2[i]) {\n      obj1[property] = obj2[i][property];\n    }\n  }\n  return obj1;\n};\n\nfunction checkDomLoaded(func) {\n  if (!domLoaded) {\n    domLoadedCallbacks.push(func);\n  } else {\n    func();\n  }\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  domLoaded = true;\n  domLoadedCallbacks.forEach(func => func());\n});\n\nlet ob1 = {apples: 1, bananas: 2, canteloupes: 3, durians: 4};\nlet ob2 = {apples: \"one\", bananas: \"two\", eggs: \"five\"};\nlet ob3 = {bananas: \"sold out\", canteloupes: \"sold out\"};\n\nlet apiUrl = \"http://api.openweathermap.org/data/2.5/weather\";\nlet apiAppId = \"bcb83c4b54aee8418983c2aff3073b3b\";\nlet apiCity = \"Leicester,uk\";\nlet apiSuxx = () => console.log(\"asuh\");\nlet apiOptions = {url: apiUrl, success: apiSuxx, error: ()=> alert(\"you can't do that!\"), data: {q: apiCity, appid: apiAppId}};\n\n$ez.ajax = (options) => {\n  const xhr = new XMLHttpRequest();\n\n  const defaults = {\n    url: \"\",\n    method: \"GET\",\n    data: {},\n    success: () => {},\n    error: () => {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n  };\n\n  options = $ez.extend(defaults, options);\n  options.method = options.method.toUpperCase();\n\n  if (options.method === \"GET\") {\n    options.url += `?${queryStringify(options.data)}`;\n  }\n\n  xhr.open(options.method, options.url, true);\n  xhr.onload = function (e) {\n    if (xhr.status === 200) {\n      options.success(xhr.response);\n    } else {\n      options.error(xhr.response);\n    }\n  };\n\n  xhr.send(JSON.stringify(options.data));\n  return xhr;\n};\n\nfunction queryStringify(obj) {\n  let qStr = \"\";\n  for (let prop in obj) {\n    qStr += `${prop}=${obj[prop]}&`;\n  }\n  return qStr.substring(0, qStr.length - 1);\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });