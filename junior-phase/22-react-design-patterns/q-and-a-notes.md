## compare and contrast composition / enhancing techniques

*Children*

E.g.

```jsx
// ...
<A>
  <B/>
</A>
// ...
```

Above is `A` being rendered with `B` being rendered and passed to as its `props.children`.

*Render props*

E.g.

```jsx
// ...
<A render={() => <B/>} />}
// ...
```

Above is `A` being rendered with a prop called `render` that is a function which (when invoked) renders `B`.

*Higher-order components*

E.g.

```jsx
// ...
const EnhancedA = withSomething(A);
// ...
```

Above is `EnchancedA` being defined by wrapping `A` via `withSomething`.

**Another way to think about it**

"I want a component (A) to render *any* potential other component (B)": we want children or render props. With children, we are *eagerly* constructing `B` when passing it to `A`. With render props, we are *lazily* constructing `B`.

"I want an enhanced version (EnhancedA) of some / any component (A)": we want a higher-order component function.

## compare and constrast lifecycle hooks

Any / all lifecycle hooks will be defined by us, but invoked by react (and friends). So that means it's important to understand: 1) when they're invoked, 2) what they will receive as arguments, 3) what they are expected to return.

```jsx
class Foo extends React.Component {
  componentDidMount () {
    // return value irrelevant
  }
  componentWillUnmount () {
    // return value irrelevant
  }
  componentDidUpdate (previousProps, previousState) {
    // return value irrelevant
  }
  shouldComponentUpdate (nextProps, nextState) {
    // return a boolean
  }
  render () {
    // return some JSX
  }
}
```

*render*

WARNING: overused term (also appears as "**render** props", "ReactDOM.**render**")

Used by react to calculate the virtual DOM, and ultimately compare it with the previous virtual DOM (passing the diff of changes to our *painting tool*).

Gets called:

- Initially by some *painting tool* (e.g. `ReactDOM.render`) when a component is passed to it
- After calling the component's `setState` method
- If its parent re-renders (e.g. the parent `setState` method invoked)

It receives these arguments: NOTHING.

It is expected to return: JSX (a react element) which will ultimately calculate the view for this rendering of this component.

*componentDidMount*

Used by us to do some logic right after the component is actually displayed to the user. Frequently "setup".

Gets called: immediately after the component is "mounted" (actually painted to the display screen), so just after the first `render`.

It receives these arguments: NOTHING.

It is expected to return: NOTHING CARES.

*componentWillUnmount*

Used by us to do some logic right before the component leaves the view. Frequently "cleanup".

Gets called: immediately before the component is "unmounted" (removed from the display screen).

It receives these arguments: NOTHING.

It is expected to return: NOTHING CARES.

*componentDidUpdate*

Used by us to (usually) determine any change in props or state that might need to trigger some logic.

Gets called: immediately after re-rendering (i.e. every `render` but the first one).

It receives these arguments: previous props and previous state.

It is expected to return: NOTHING CARES.

*shouldComponentUpdate*

Used by us for performance gains, to actively NOT re-render based on some special information about the component at hand.

Gets called: immediately before re-rendering (i.e. every `render` but the first one).

It receives these arguments: next props and next state.

It is expected to return: true or false which will ultimately determine whether the render-about-to-happen does indeed happen.

## conditional exporting

For example if you want to put your export statements in an `if..else` block.

Not with ES modules (`import` / `export`, but this is possible with CommonJS (`require` / `module.exports`).
