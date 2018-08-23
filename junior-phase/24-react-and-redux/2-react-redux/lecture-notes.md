## react-redux

A library that helps us integrate react with redux. "React bindings" library for redux.

`react-redux` gives us two functions: `Provider` and `connect`.

## `Provider`

A component that takes the store as a prop and will "provide" it to any `connect`ed components.

This means we will have ONE provider instance at the root of our application.

## `connect`

A function that takes a "map state to props" callback and a "map dispatch to props" callback and returns a function that takes a component to wrap. When we invoke with the component we want to wrap, that returns an "enhanced" / "connected" version of that wrapped component.

`connect` allows us to define a component that has access to the store state and to dispatch and ultimately passes certain props down to the inner component.

Each time we wrap a component, `connect`ing it to the store, we will define a different "map state to props" and "map dispatch to props" for exactly what that wrapped component needs.

"Map state to props" (first argument to connect)...

Answers the question: "what part of the state does the wrapped component care about?"

- Gets called: every time the store state changes
- Will receive: the store's state
- Should return: an object where the keys are props (and the values are generally data) that the "inner" / "wrapped" component will expect to receive

"Map dispatch to props" (second argument to connect)...

Answers the question: "how will the wrapped component use dispatch?"

- Gets called: when the wrapped component is constructed
- Will receive: the store's dispatch method
- Should return: an object where the keys are props (and the values are generally methods) that the "inner" / "wrapped" component will expect to receive

`connect` is a higher-order component function!

## passing props the the inner component

We can pass props *unrelated* to the redux store to the "wrapped" / "inner" component by passing them to the "wrapping" / "outer" component:

```jsx
// ...
const SomeComponent = (props) => (
  // ... use props.aCustomProp
);
// ...
const ConnectedSomeComponent = connect(/* ... */)(SomeComponent);
// ...
<ConnectedSomeComponent aCustomProp='foo' />
// ...
```
