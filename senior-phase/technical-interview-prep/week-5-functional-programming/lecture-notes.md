# Functional Programming

## What is functional programming?

- Programming where functions are primary
- Mantra: lots of reusable and smaller functions (compose functions together)
- Goal: have pure functions
  - Same input produces same output
  - No side effects, where a side effect is: something external to the inputs and outputs of the function (e.g. `console.log`)
  - Advantage: isolated, specific / have one role, predictable
- Partial application: where a function receives some of its arguments but does not execute; Currying: where a function does not execute until it has received all of its arguments
- Immutability: where no data "changes", instead we always transform some old data into new data; this comes from the idea of "mutation"
- Object oriented programming does not have to oppose functional programming, great example react
- Object oriented programming often is "stateful" whereas functional tends to be "stateless"

## Javascript love / hate with functional programming

- Javascript wasn't really built for immutability, statelessness, but it can be extended to work that way
- Otherwise it has all the components from above

## Higher order functions

Functions that accept functions as input and / or returns functions as output. `Promise` constructor is a good example, also `setTimeout` (and any callback-based programming), `.forEach` / `.map` / `.filter` / `.every`, `dispatch` in redux.

Functions that call other functions are **not** technically higher-order:

```js
const randomNumberBetween = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
```

Exercise: build an `EventEmitter` class. Instances should have two methods: `on` and `emit`. `on` takes an event name and a handler function, and registers that handler callback for that event name. `emit` takes an event name and some data and invokes all the callbacks registered to that event name (with the given data).

Follow-up: make `on` return a function that "deregisters" the given handler.

Example...

```js
const ee = new EventEmitter();
const deregister = ee.on('cute', function (data) {
  console.log(data, 'is so cute!');
});
ee.emit('cute', 'FUNCTIONAL PROGRAMMING'); // logs 'FUNCTIONAL PROGRAMMING is so cute!'
deregister();
ee.emit('cute', 'FUNCTIONAL PROGRAMMING'); // nothing happens
```

A solution:

```js
class EventEmitter {
  constructor () {
    this.handlers = {};
  }
  on (eventName, handler) {
    // keep track of handler for later
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [handler];
    } else {
      this.handlers[eventName].push(handler);
    }
    return () => {
      // remove this handler
      this.handlers[eventName] = this.handlers[eventName].filter(eachHandler => {
        return eachHandler !== handler;
      });
    };
  }
  emit (eventName, data) {
    // call all handlers for this event
    for (const handler of this.handlers[eventName]) {
      handler(data);
    }
  }
}
```

A good example of higher order functions, but NOT an example of immutability.

## Partial function application

"Full" function application is giving a function its arguments and invoking it. Giving a function some of its arguments and not invoking it—instead you get back a "partially applied" version (new function) that can be invoked later with the remaining arguments.

```js
const addTwoThings = (a, b) => {
  return a + b;
};
const addTenToOneThing = partiallyApply(addTwoThings, 10);
addTenToOneThing(5); // 15
```

Exercise: build `partiallyApply` as described above. Start by assuming the input function can only take two arguments, then as a follow-up work with input functions that make take any number of arguments.

Follow-up example:

```js
const addFourThings = (a, b, c, d) => {
  return a + b + c + d;
};
const addTenAndTwentyToTwoThings = partiallyApply(addThreeThings, 10, 20);
addTenAndTwentyToTwoThings(7, 11); // 48
```

A solution:

```js
// initial
const partiallyApply = (fn, firstArg) => {
  return secondArg => {
    return fn(firstArg, secondArg);
  };
};
```

```js
// follow-up
const partiallyApply = (fn, ...someArgs) => {
  return (...moreArgs) => {
    return fn(...someArgs, ...moreArgs);
  };
};
```

Note: we don't have to use the rest and spread operators, we could use the `arguments` keyword and `.apply`.

*WHY?*

- Fundamental for composing different functions (if you're diving into functional programming)
- Helps you make an existing function more specific

```js
const taxAmounts = {
  NY: 0.0625
};
const calculateTotal = (region, rawTotal) => {
  return rawTotal + rawTotal * taxAmounts[region];
};
const nyTaxTotal = partiallyApply(calculateTotal, 'NY');
```

This already exists in Javascript, it's not called `partiallyApply` it's called `.bind`:

```js
const taxAmounts = {
  NY: 0.0625
};
const calculateTotal = (region, rawTotal) => {
  return rawTotal + rawTotal * taxAmounts[region];
};
const nyTaxTotal = calculateTotal.bind(null, 'NY');
```

Woah!

## Composition

What is "composition"? Making something larger out of smaller pieces.

In functional programming, composition is sometimes even a top-level tool:

```js
const addFive = num => num + 5;
const multiplyByTen = num => num * 10;
const addFiveThenMultiplyByTen = num => multiplyByTen(addFive(num)); // manual composition
const addFiveThenMultiplyByTen = compose(multiplyByTen, addFive); // automatic
```

In Javascript, `compose` is NOT built in.

In object oriented programming "composition" means using one class from another. This is often as opposed to "inheritance", extending one class from another.

Inheritance models the "is-a" relationship, and is implemented with *extension*.

```js
class Fruit {
  constructor () {
    this.freshness = 100;
  }
  age () {
    this.freshness--;
  }
}
class Apple extends Fruit {
  constructor () {
    super(); // invoke the super class constructor (here that's `Fruit`)
    this.hasSkin = true;
  }
  peel () {
    this.hasSkin = false;
  }
}
```

Composition models the "has-a" or "uses-a" relationship, and is implemented by attaching an instance of the "used class" to the "using class".

Psuedo-code example:

```js
class StaticArray {
  // ... works like a C-ish array
}
class HashTable {
  constructor () {
    this._staticArray = new StaticArray();
  }
  get (key) {
    const index = someHashFn(key);
    return this._staticArray[index];
  }
  set (key, vaue) {
    const index = someHashFn(key);
    this._staticArray[index] = value;
  }
  delete (key) {
    const index = someHashFn(key);
    this._staticArray[index] = undefined;
  }
}
```

Composition is good because it makes it more difficult to accidentally use internal methods that are not relevant to using a class. Helps to compartmentalize.

"Composition versus inheritance" is a choice. Making that choice involves deciding whether the class you are defining "is-a" or "uses-a" instance of the class you already have.

## Immutability

Not mutating data, instead transforming it into a new data set.

Exercise: build an immutable singly-linked list. It should have a `head` property and two methods: `addToHead` and `removeFromHead`. Each node in the linked list should have a `value` property and a `next` property pointing to the next node or `null` if it's the tail. For example:

```js
const original = new ImmutableLinkedList();
const fiveAtHead = original.addToHead(5);
const sixAtHead = fiveAtHead.addToHead(6);

const removedSix = sixAtHead.removeFromHead();
/*
            removedSix
sixAtHead   fiveAtHead   original
    v           v           v
    6 --------> 5 -------> null
*/
```

A solution:

```js
class ImmutableLinkedList {
  constructor (optionalHead) {
    if (optionalHead === undefined) {
      this.head = null;
    } else {
      this.head = optionalHead;
    }
  }
  addToHead (value) {
    // return a list
    const newHeadNode = {
      value,
      next: this.head
    };
    return new ImmutableLinkedList(newHeadNode);
  }
  removeFromHead () {
    // return a list
    if (!this.head) return this;
    return new ImmutableLinkedList(this.head.next);
  }
}
```
