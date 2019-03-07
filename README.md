# __EZPZ__
EZPZ is a cross-platform library written in JavaScript for traversing and manipulating the DOM, event handling, and making asynchronous HTTP requests (AJAX).

### [Click here to play SIMIAN,](https://www.omardeleo.me/simian "Play SIMIAN") a memory game powered by EZPZ!

## Documentation

#### How to install EZPZ
Installing EZPZ is as simple as including a reference to the EZPZ script inside a ``` <script> ``` tag, within the ``` <head> ``` section of your HTML file:

``` HTML
<head>
  <meta charset="utf-8">
  <title>EZPZ</title>
  <script src="https://storage.cloud.google.com/ezpz/ezpz.js"></script>
  </script>
</head>
```


## API

### ```$ez(“element”)```Element Selector

Select all elements with the given tag name.

### ``` .html() ```

Get the HTML contents of the first element in the set of matched elements (without argument). Set the HTML contents of every matched element (with argument).

``` HTML
<p>This is a paragraph</p>
```
**Example 1: Without Argument**
``` JS
$ez("p").html()
```

returns the following:
``` JS
"This is a paragraph"
```
**Example 2: With Argument**
``` JS
$ez("p").html("Hey this is different")
```
renders the following:
``` HTML
<p>Hey this is different</p>
```

### ``` .empty() ```

Remove all child nodes of the set of matched elements from the DOM.
```HTML
<p class="one">Hey</p>
<p class="two">There</p>
<p class="three">You</p>
```


**Example**

```JS
$ez("p").empty()
```

renders the following:

```HTML
<p class="one"></p>
<p class="two"></p>
<p class="three"></p>
```

### ``` .append() ```

Insert content to the end of each element in the set of matched elements.

``` HTML
<p>This is a paragraph</p>
```
**Example**
``` JS
$ez("p").append(" with some text appended to it.")
```
renders the following:
``` HTML
<p>This is a paragraph with some text appended to it.</p>
```

### ``` .attr() ```

Get the value of an attribute for the first element in the set of matched elements (with one argument). Set one or more attributes for every matched element (with two arguments).

``` HTML
<p class="greeting">Hello you!</p>
```

**Example 1: Without Argument**
```JS
$ez("p").attr("class")
```
returns the following:
```JS
"greeting"
```

**Example 2: With Argument**
```JS
$ez("p").attr("class", "salutation")
```
renders the following:
``` HTML
<p class="salutation">Hello you!</p>
```

### ``` .addClass() ```

Add the specified class or classes to each matched element.

``` HTML
<p>This is a paragraph</p>
```

**Example**
```JS
$ez("p").addClass("text")
```

renders the following:
``` HTML
<p class="text">This is a paragraph</p>
```

### ``` .removeClass() ```

Remove a single class, multiple classes, or all classes from each matched element.

``` HTML
<p class="text">This is a paragraph</p>
```

**Example**
```JS
$ez("p").removeClass("text")
```

renders the following:
``` HTML
<p>This is a paragraph</p>
```

### ``` .children() ```

Get the children of each matched element, with optional filter.

```HTML
<ul>
  <li>One</li>
  <li>Two</li>
</ul>
```

Example:
```JS
$ez("ul").children().html("List item");
```

renders the following:
```HTML
<ul>
  <li>List item</li>
  <li>List item</li>
</ul>
```

### ``` .parent() ```

Get the parent of each matched element, with optional filter.

```HTML
<ul>
  <li>List item</li>
</ul>
```

Example:
```JS
$ez("li").parent().addClass("list");
```

renders the following:
```HTML
<ul class="list">
  <li>List item</li>
</ul>
```

### ``` .find() ```

Get the descendant elements of the selected element, with optional filter.
```HTML
<div>
  <p>Click for more info</p>
  <a href="#">Link 1</a>
  <p>Click for no reason</p>
  <a href="#">Link 2</a>
</div>
```

Example:
```JS
$ez("div").find('p').html("CLICK HERE");
```
renders the following:
```HTML
<div>
  <p>Click for more info</p>
  <a href="#">CLICK HERE</a>
  <p>Click for no reason</p>
  <a href="#">CLICK HERE</a>
</div>
```
### ``` .remove() ```

Remove all matched elements from the DOM

```HTML
<div>
  <p>Click for more info</p>
  <a href="#">Link 1</a>
  <p>Click for no reason</p>
  <a href="#">Link 2</a>
</div>
```

Example:
```JS
$ez("div").remove('a');
```
renders the following:
```HTML
<div>
  <p>Click for more info</p>
  <p>Click for no reason</p>
</div>
```

## Event Handlers

### ``` .on() ```
Attach an event handler function for a single or multiple events to the selected elements.

``` HTML
<p>This is a paragraph</p>
```

**Example**
```JS
$ez("p").on('click', () => $ez("p").html("Text has changed"))
```
renders the following upon clicking:
``` HTML
<p>Text has changed</p>
```
### ``` .off() ```
Remove an event handler function from the selected elements.
``` HTML
<p>This is a paragraph</p>
```
**Example**

```JS
$ez("p").off('click', () => $ez("p").html("Text has changed"))
```

renders no changes upon clicking.


## Document Ready
### ``` $ez(callback) ``` or ``` .ready() ```
Pass a callback function that will execute when the DOM is fully loaded.

## AJAX

### ``` $ez.extend() ```
Merge the contents of two or more objects into the first object.

```JS
var obj1 = {a: 1}
var obj2 = {b: 2}
```
**Example**
```JS
$ez.extend({}, obj1, obj2)
```
returns the following:
```JS
{a: 1, b:2}
```

### ``` $ez.ajax() ```
Perform an asynchronous HTTP request passing settings through an options object.

**Example**
```JS
$ez.ajax({url: 'https://www.swapi.co/api/people/1', success: (data) => console.log(data)})
```

returns the following:
```
{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://www.swapi.co/api/planets/1/","films":["https://www.swapi.co/api/films/2/","https://www.swapi.co/api/films/6/","https://www.swapi.co/api/films/3/","https://www.swapi.co/api/films/1/","https://www.swapi.co/api/films/7/"],"species":["https://www.swapi.co/api/species/1/"],"vehicles":["https://www.swapi.co/api/vehicles/14/","https://www.swapi.co/api/vehicles/30/"],"starships":["https://www.swapi.co/api/starships/12/","https://www.swapi.co/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://www.swapi.co/api/people/1/"}
```

### [Click here to play SIMIAN](https://www.omardeleo.me/simian "Play SIMIAN"), a memory game powered by EZPZ!
