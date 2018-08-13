## `class` vs. `function` component syntax (with examples)

React components can have:

- a render method (necessary)
- constructor (optional)
- lifecycle hooks, as methods (e.g. `componentDidMount` or `componentWillUnmount`)
- state

If you're defining a component that *only* needs a render method, react allows you to define it as a function component. For example, we could replace...

```jsx
// class component syntax
class Foo extends React.Component {
  render () {
    return (
      <h2>I am bar!</h2>
    );
  }
}
```

...with...

```jsx
// function component syntax
const Foo = () => {
  return (
    <h2>I am bar!</h2>
  );
}
```

Function components are high in simplicity but low in flexibility / power (you cannot have state, a constructor, lifecycle hooks, or really anything besisdes a "render").

A really important difference in how to access the component's props. A class component accesses props like this (`this.props`):

```jsx
// class component syntax
class PageTitle extends React.Component {
  render () {
    return (
      <h2>{this.props.text}</h2>
    );
  }
}
```

A function component accesses props like this (props as the first argument):

```jsx
// function component syntax
const PageTitle = (props) => {
  return (
    <h2>{props.text}</h2>
  );
}
```

## what will `this` be in various react methods

To *precisely* determine `this`, we have to know how a function is called (invoked).

When / how do we invoke a component's `render` method? ONLY EVER INDIRECTLY. We **never** have code that looks like:

```jsx
// ...SomeComponent already exists
const someComponentInstance = new SomeComponent();
someComponentInstance.render();
```

We do not directly define / determine the `this` for `render` or for any other lifecycle hooks.

To know what the `this` will be we have to:

1. Look at the source for react (hardest, worst, exact)
2. Look at the docs for react (much simpler, much better, reliable)
3. Guess—ask yourself, *if I were developing the react library source code, what would I do?* (simplest, least exact)

It turns out the `this` inside your lifecycle hooks (and `render`) will be the component instance.

## `super` when / why is it used (and when is it mandatory)

`super` is used when you `extends` a class. `super` allows you to invoke the consturctor of the class you are extending from.

```js
// es5
function Car (license) {
  this.license = license;
}
Car.prototype.brake = function () {/*...*/};

function Truck (license) {
  // extend by properly calling the super class's constructor
  Car.call(this, license);
}
// extend by properly assigning the prototype chain
Truck.prototype = Object.create(Car.prototype);
Truck.prototype.constructor = Truck;
Truck.prototype.driveUpASnowyMountain = function () {/*...*/};
```

```js
// es6
class Car {
  brake () {/*...*/}
}

// by default this will call the `super` constructor
class Truck extends Car {
  driveUpASnowyMountain () {/*...*/}
}
```

A similar example, but where we need `super` (because we are doing something custom in the sub class constructor):

```js
// es5
function Car (license) {
  this.license = license;
}
Car.prototype.brake = function () {/*...*/};

function Truck (license, pulley) {
  // extend by properly calling the super class's constructor
  Car.call(this, license);
  this.pulley = pulley;
}
// extend by properly assigning the prototype chain
Truck.prototype = Object.create(Car.prototype);
Truck.prototype.constructor = Truck;
Truck.prototype.driveUpASnowyMountain = function () {/*...*/};
```

```js
// es6
class Car {
  brake () {/*...*/}
}

class Truck extends Car {
  constructor (license, pulley) {
    super(license); // Car.call(this, license);
    this.pulley = pulley;
  }
  driveUpASnowyMountain () {/*...*/}
}
```

`super` is a reference to the super class's constructor function. In es6 class syntax, if you are going to use `this` inside a constructor for a class that `extends` from another class, you have to call `super` first. This is an artificial restriction put in by es6 to make sure that people use class extension "properly".

## UX without react

Without react, we need to manage application state (somehow). On user actions, we need to:

- update the application state (somehow)
- manually update any / every relevant part of the view (step-by-step)

(For an example, look back to Trip Planner.)

With react, we manage application state via `this.state` (access) and `this.setState` (changing). React performs view updating for us, but we still need to specify what each declarative view looks like.
