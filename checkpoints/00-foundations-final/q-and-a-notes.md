## `createFunctions` and closure

Example of what is supposed to happen:

```js
var arrayOfFunctions = createFunctions(5); // create an array, containing 5 functions

arrayOfFunctions[0](); // must return 0
arrayOfFunctions[3](); // must return 3
arrayOfFunctions[arrayOfFunctions.length - 1 ](); // must return 4
```

Code that does NOT work:

```js
function createFunctions (size) {
  const fns = [];
  for (var i = 0; i < size; i++) {
    fns.push(function () {
      return i;
    });
  }
  return fns;
}
```

What goes wrong? All the different functions in the array share the same `i` pointer / value. The variable `i` exists in the `createFunctions` scope so there will always only ever be ONE value for it. In this case, all the functions in our array will always return the "size".

Code that does work:

```js
function createFunctions (size) { // size = 5
  const fns = []; // [function, function, function, function, function]
  for (var i = 0; i < size; i++) { // i = 5
    (function (n) { // immediately invoked function expression (IIFE)
      fns.push(function () {
        return n;
      });
    })(i);
  }
  // 1st function: n = 0
  // 2nd function: n = 1
  // 3rd function: n = 2
  // 4th function: n = 3
  // 5th function: n = 4
  return fns;
}
```

What goes right? We define AND execute a different function on each cycle of the loop. Each of those anonymous functions has its own scope—i.e. `n` is a DIFFERENT variable with a different potential value for each time we invoke the IIFE (each cycle of loop).

## `extendWithNewKeyword` but why and how?

What does `new` do?

```js
function Foo () {}
const thing = new Foo();
// thing.__proto__ === Foo.prototype
```

One possible solution:

```js
function extendWithNewKeyword (toClass, fromClass) {
  toClass.prototype = new fromClass();
  // toClass.prototype.__proto__ === fromClass.prototype
  toClass.prototype.constructor = toClass;
}
```

Let's look at an example:

```js
function Spoon () {}
Spoon.prototype.scoop = function () {
  // ...
};
function SoupSpoon () {}
SoupSpoon.prototype.thatThingWhereYouCoolOffYourSoup = function () {
  // ...
};
// if we want `SoupSpoon` to extend from `Spoon`
// we need to make sure that `SoupSpoon.prototype` has `Spoon.prototype` internally
// `SoupSpoon.prototype.__proto__ = Spoon.prototype`
// one way to acheive that would be to do `SoupSpoon.prototoype = new Spoon();`
// or...
extendWithNewKeyword(SoupSpoon, Spoon);
```

Understanding the prototype chain and prototypal inheritance is *useful*. Understanding exactly how to build class extension using `new`—not crucial.

## `reduceRightRecursive`

One take:

```js
// // let's think of an example
// reduceRightRecursive([], 5, (a, b) => a - b); // 5
// reduceRightRecursive([2], 5, (a, b) => a - b); // 5 - 2
// ...
// reduceRightRecursive([1, 2], 5, (a, b) => a - b); // 5 - 2 - 1
// reduceRightRecursive([1], 3, (a, b) => a - b); // 3 - 1
// reduceRightRecursive([], 2, (a, b) => a - b); // 2
function reduceRightRecursive (arr, initialValue, reducer) {
  if (arr.length === 0) return initialValue;
  const nextValue = reducer(initialValue, arr[arr.length - 1]);
  const nextArr = arr.slice(0, -1);
  return reduceRightRecursive(nextArr, nextValue, reducer);
}
```
