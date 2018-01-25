# __DOMSelecta!__
DOMSelecta! is a cross-browser library for traversing and manipulating the DOM, written in JavaScript.

## Documentation

#### How to install DOMSelecta!
Installing DOMSelecta! is as simple as including a reference to the DOMSelecta script inside a ``` <script> ``` tag, within the ``` <head> ``` section of your HTML file:

``` HTML
<head>
  <meta charset="utf-8">
  <title>DOMSelecta!</title>
  <script type="text/javascript" src="./lib/dom_selecta.js">
  </script>
</head>
```


## API

#### Element Selector ```$ds(“element”)```

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

Add the specified class or classes to each matched element.

#### ``` .removeClass() ```

Remove a single class, multiple classes, or all classes from each matched element.

#### ``` .children() ```

Get the children of each matched element, with optional filter.

#### ``` .parent() ```

Get the parent of each matched element, with optional filter.

#### ``` .find() ```

Get the descendant elements of the selected element, with optional filter.

#### ``` .remove() ```

Remove all matched elements from the DOM.

## Event Handlers

#### ``` .on() ```
Attach an event handler function for a single or multiple events to the selected elements.

#### ``` .off() ```
Remove an event handler function from the selected elements.

## Document Ready
#### ``` $ds(callback) ``` or ``` .ready() ```
Pass a callback function that will execute when the DOM is fully loaded.

## AJAX

#### ``` $ds.extend() ```
Merge the contents of two or more objects into the first object.

#### ``` $ds.ajax() ```
Perform an asynchronous HTTP request passing settings through an options object.
