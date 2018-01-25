const DOMNodeCollection = require('./dom_node_collection');
let domLoaded = false;
let domLoadedCallbacks = [];

window.$ds = function(arg) {
  let dnc;
  if (typeof arg === HTMLElement) {
    dnc = new DOMNodeCollection([arg]);
  } else if (typeof arg === "function") {
    checkDomLoaded(arg);
    dnc = new DOMNodeCollection(document);
  } else if (arg === document) {
    dnc = new DOMNodeCollection(document);
  } else {
    let nodeList = Array.from(document.querySelectorAll(arg));
    dnc = new DOMNodeCollection(nodeList);
  }


  return dnc;
};

$ds.extend = (obj1, ...obj2) => {
  for (let i = 0; i < obj2.length; i++) {
    let obj = obj2[i];
    for (let property in obj2[i]) {
      obj1[property] = obj2[i][property];
    }
  }
  return obj1;
};

function checkDomLoaded(func) {
  if (!domLoaded) {
    domLoadedCallbacks.push(func);
  } else {
    func();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  domLoaded = true;
  domLoadedCallbacks.forEach(func => func());

});

let ob1 = {apples: 1, bananas: 2, canteloupes: 3, durians: 4};
let ob2 = {apples: "one", bananas: "two", eggs: "five"};
let ob3 = {bananas: "sold out", canteloupes: "sold out"};

let apiVar = "http://api.openweathermap.org/data/2.5/weather?q=Leicester,uk&appid=bcb83c4b54aee8418983c2aff3073b3b";

let thing = $.ajax({url: apiVar,
type: 'GET'});
// console.log(thing);

const xhr = new XMLHttpRequest();
const defaults = {
  url: "",
  method: "GET",
  data: {},
  success: () => {},
  error: () => {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
};
xhr.open('GET', apiVar);

xhr.onload = function () {
  // console.log(xhr);
};

xhr.send();
