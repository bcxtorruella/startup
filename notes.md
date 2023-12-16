### Study Guide

HTTP port: 80 HTTPS: 443 SSH: 22
HTTP status codes: 300: decline/redirect, 400: client error, 500: server error
`content-type` allows specification of file type and data language
Cookie attributes:
- Domain: only servers and code from that domain can read the cookie
- Path: like domain, but a path on the domain that the script must be hosted on to read the cookie
- SameSite: if false, then disregard above. Should be true
- HTTPOnly: don't let JS access me
MongoDB: $gt looks for greater than
Store with hash and salt
WebSocket is a long-lived bidirectional connection w messages
JSX is a way to interpret XML like fragments in JS files by converting to JS instructions
React Hooks let you hook into the builtin lifecycle of the React render process. useEffect is every render, useState is across renders.
Node.js is runtime and executes js outside browser
Npm is package manager compatible with node.js ^ and other stuff vv
Vite is a frontend build tool. Linter, minifiers. Even if a package isn't loaded at runtime in the browser vite can load it.

### execute a func for each in an array
```js
rentals.forEach((i) => console.log(i));
```

### GitHub: 
commit often and don't mix up who works on what task. Fixing branches down the road is a headache
Fetch = refresh
Add is local staging, commit is save, and push is upload

### SSH 
from folder containing key, do:
`ssh -i production.pem ubuntu@3.209.168.176`
3.209.168.176 is the elastic IP

### JS Array functions

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => 1 < 1)`          |

### Sorting arrays

It's basically done with an arrow function. 
`myarray.sort((a, b) => sortDirection * (a.sortBy < b.sortBy ? 1 : -1));`

`toSorted` returns a new array without modifying the original


### HTML modification from JS
`document` refers to the whole HTML document linked to (which is done by putting `<script src="table.js"></script>` in the HTML). 

Can find elements that are children of the whole page with `document.querySelector('CSStag-EGdiv')`;
CSStag can be ID or class: `#courses`

Delete: `el.parentElement.removeChild(el);`

Insert: `const newChild = document.createElement('elementType-EGdiv');`

Can replace whole HTML of element with `element.innerHTML`: `el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';`

Modify text with `element.textContent = "foobar"`

Also NB `cellElement.setAttribute("onclick", "value")`;

Format strings with \`${variable}\`

### JSON
For JS Object -> string: `JSON.stringify(obj);`
For string -> JS Object: `JSON.parse(jsonString);`

### Promises
Allow parallel (not simultaneous) threading

#### Make a new promise obj then construct it:
This constructor is called immediately. The delayed function is in `then()`, called when `resolve()` is.
```
     return new Promise((resolve, reject) => {
          order.element.innerHTML = `<span>[${order.id}] &#127829; <b>Making pizza</b> ...</span>`;
          doWork(order, 300, 1000, resolve, reject, "Burned your pizza!");
    });
```
And then somewhere within the constructor or called function do and if/else for resolve/reject:
```
    if (workTime < max * 0.85) {
      resolve(order);
    } else {
      order.error = errMsg;
      reject(order);
    }
```
And to handle these responses you can:
```
coinToss // a newly constructed or returned Promise
  .then((result) => console.log(`Coin toss result: ${result}`))  // accesses the Promise's result
  .catch((err) => console.log(`Error: ${err}`))                  // accesses the Promise's error message
  .finally(() => console.log('Toss completed'));                 // always excecutes
```
***NB: `resolve(value, err)` calls `then(value, reason)`, and `reject(err)` calls `catch(reason)`; they pass the arguments***

So in that way you can use resolve to pass messages to then, which can output them into HTML or whatever.

`then()` is really the only one you need. Tis the primitive

But in the end you can just `resolve()` a promise inside its constructor, and then something like `console.log(await cow());` will, for example, print the resolve result value message thing





### `await`ing an `async` function: the actual way
big boys do:
```js
     const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
     const jsonResponse = await httpResponse.json();
     console.log(jsonResponse));
     console.log('done');
```
`async` functions are always instantly resolved and return a promise object. If youdeclare a return Promise object, though, it is not instantly resolved upon returning, even if `resolve()` is in the constructor???

You can only `await` at top level or in an `async` function



# After second midterm

### GET request:

```js
fetch('https://api.quotable.io/random')
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

### POST request
```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
     // JSON object to pass into database
    title: 'test title',
    body: 'test body',
    userId: 1,
  }),
  headers: {
     // certain predetermined things
    'Content-type': 'application/json; charset=UTF-8',
  },
})
     // returns response, with json() can get a JSON object
  .then((response) => response.json())
  .then((jsonResponse) => {
    console.log(jsonResponse);
  });
```

### Business about CORS, SOP, accepted origins?

### Making a proj w Node.js

1. Create your project directory
1. Initialize it for use with NPM by running `npm init -y`
1. Make sure `.gitignore` file contains `node_modules`
1. Install any desired packages with `npm install <package name here>`
1. Add `require('<package name here>')` to your application's JavaScript
1. Use the code the package provides in your JavaScript
1. Run your code with `node index.js`

In practice this looks like:

```js
const giveMeAJoke = require('give-me-a-joke');
giveMeAJoke.getRandomDadJoke((joke) => {
  console.log(joke);
});
```

### How to Fetch an API
```js
const url = "https://api.chucknorris.io/jokes/random";
fetch(url)
  .then((x) => x.json())
  .then((response) => {
  
    document.querySelector("pre").textContent = response['value'];
  });
```

### This code saved my life

```js
// tell everyone else you just searched it
configureWebSocket();
const me = JSON.parse(localStorage.getItem('currentUsername'));
broadcastEvent(me, "search", word);
```

The way it works: broadcastEvent sends it to the server, eventually indirectly activating all the other clients' socket.onmessage methods. مَا شَاءَ ٱللَّٰهُ!
