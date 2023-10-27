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
```
     return new Promise((resolve, reject) => {
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
