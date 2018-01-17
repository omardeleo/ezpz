# DOMSelecta!
DOMSelecta! is a cross-browser library for traversing and manipulating the DOM, written in JavaScript.

## Documentation

#### How to install DOMSelecta!
Installing DOMSelecta! is as simple as including a reference to the DOMSelecta script in a ``` <script> ``` tag inside the ``` <head> ``` section of your HTML file:

``` HTML
<head>
  <meta charset="utf-8">
  <title>DOMSelecta!</title>
  <script type="text/javascript" src="./lib/dom_selecta.js">
  </script>
</head>
```


## API

#### ```Element Selector (“element”)```


Select all elements with the given tag name.

#### ``` .html() ```

Get the HTML contents of the first element in the set of matched elements (without argument). Set the HTML contents of every matched element (with argument).

#### ``` .empty() ```

Remove all child nodes of the set of matched elements from the DOM.

#### ``` .append() ```

Insert content to the end of each element in the set of matched elements.

#### ``` .attr() ```

Get the value of an attribute for the first element in the set of matched elements (with one argument). Set one or more attributes for every matched element (with two arguments).

#### ``` .addClass() ```

Add the specified class/es to each element in the set of matched elements.

#### ``` .removeClass() ```

Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

#### ``` .children() ```

Get the children of each element in the set of matched elements. Optionally filter with selector.

#### ``` .parent() ```

Get the parent of each element in the current set of matched elements. Optionally filtered with selector.

#### ``` .find() ```

Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.

#### ``` .remove() ```

Remove the set of matched elements from the DOM.```
