## terms

- Action: object (normally containing type and some payload data), gets `dispatch`ed
- Action type: string, part of an action (object) specifying what the action is
- Action creator: function that returns an action

## action types

In redux, we frequently define action types as (all caps) variables to avoid / help with potential typos.

E.g. instead of:

```js
// ...
store.dispatch({type: 'eat'});
// ...
const reducer = (state, action) => {
  switch (action.type) {
    // ...
    case 'eat':
    // ...
  }
};
// ...
```

We have:

```js
// ...
const EAT = 'eat';
// ...
store.dispatch({type: EAT});
// ...
const reducer = (state, action) => {
  switch (action.type) {
    // ...
    case EAT:
    // ...
  }
};
// ...
```

## action creators

We also frequently define action creators as functions to avoid / help with potential typos and to make a code a litte more succinct:

E.g. instead of:

```js
// ...
const EAT = 'eat';
// ...
store.dispatch({type: EAT});
// ...
```

We have:

```js
// ...
const EAT = 'eat';
// ...
const eat = (/* ... */) => {
  return {
    type: EAT,
    // ...
  };
};
// ...
store.dispatch(eat());
// ...
```

## named exports

We will frequently be `export`ing action creators as "names exports". Here's an example of the syntax:

```js
// foo.js
export const foo = 5; // notice the lack of the `default` keyword
```

```js
// bar.js
import {foo} from './foo'; // notice the {}
```

As opposed to `export default` which would look like:

```js
// foo.js
const foo = 5;
export default foo; // notice the `default keyword`
```

```js
// bar.js
import foo from './foo'; // notice the lack of {}
```

## one-line-arrow-function-that-returns-an-object

And finally, we will frequently be defining action creators as one line arrow functions. But JS has a hard time distinguising object curly braces from code block curly braces, so to make it unambiguous to the parser we have to wrap the object in parens.

E.g. instead of:

```js
// ...
const eat = (/* ... */) => {
  return {
    type: EAT,
    // ...
  };
};
// ...
```

We have:

```js
// ...
const eat = (/* ... */) => ({type: EAT, /* ... */});
// ...
```
