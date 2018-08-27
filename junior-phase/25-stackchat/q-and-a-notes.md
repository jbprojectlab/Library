## stackchat comment a component

Let's talk about `NameEntry`:

```jsx
// ...

// definig a react component, it knows nothing about redux / the store, it receives props
export class NameEntry extends React.Component {
    constructor() {
        super()
        // binding handle change to make sure that its `this` will always be the component instance
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        // get the value from the input
        const { value: name } = event.target
        // call some method on props called `.userSet`
        this.props.userSet(name)
    }
    render() {
        return (
            <React.Fragment>
                <label htmlFor="name">Your name:</label>
                {/* assign the input a value based off of props, and give it our `handleChange` */}
                <input
                    name="name"
                    onChange={this.handleChange}
                    value={this.props.userName}
                />
            </React.Fragment>
        )
    }
}

// we call connect to make sure that the component above will receive the parts of the store we want it to be able to use, and this gives us back a "connected component" version of it that we export here
export default connect(
    // any time the store state changes, pass in a `.userName` prop to the wrapped component (NameEntry) based on the value in the store state `.user`
    state => ({
        userName: state.user,
    }),
    // pass a method to the wrapped component, called `.userSet` which given some str will send that string to the store via dispatching an action (which itself was created with an action creator)
    dispatch => ({
        userSet: nameStr => dispatch(userSet(nameStr)),
    })
)(NameEntry)
```

## forms and input value in react

We can explicitly assign a value to an input (in react). If we do so, we are signalling that the value will ONLY ever update if we pass in a new one. So for example, it will not update (by default) any more when / if the user directly interacts with it:

```jsx
// ...
<input value={'stuck'} />
// ...
```

The above code is BROKEN (probably). The value of the input will ALWAYS be `'stuck'` no matter how the user interacts with it. An `input` that we assign a `value` prop is called a **controlled component**. An `input` that we do NOT assign a `value` prop is called an **uncontrolled component**.

Here's a better example of a non-broken controlled component:

```jsx
// ...
<input value={this.props.favoriteSentence} />
// ...
```

...assuming that `this.props.favoriteSentence` will change / update. This is almost always paired with an `onChange` handler. So it'd probably be more like:

```jsx
// ...
<input
  value={this.props.favoriteSentence}
  onChange={this.changeFavoriteSentence} />
// ...
```

...assuming that `this.changeFavoriteSentence` is defined and presumably causing some update / change to the `this.props.favoriteSentence` value.

## why choose a controlled or uncontrolled component?

In order to check something while the user is typing: you need `onChange` registered that component. Registering an `onChange` handler is *different* than a controlled / uncontrolled component (which is when you either pass `value` prop or not).

Uncontrolled component has the advantage of less code / more simple. If you can let the browser handle the input updating you might as well.

Controlled component is *necessary* when the input's rendered value (the actual thing the user sees) might change for a reason OTHER THAN the default user interaction with it. E.g. if you want to clear a value after submitting. Can be nice (but is not necessary) when the data of this input needs to be shared with some other component.

## default values for models

If the default value you want to provide is *static* (always the same), you can do:

```js
// ...
const Coffee = db.define('coffee', {
  // ...
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Cody Special'
  },
  // ...
});
// ...
```

If the default value you want to provide is *dynamic*, you can do a function:

```js
// ...
const Coffee = db.define('coffee', {
  // ...
  name: {
    type: Sequelize.STRING,
    defaultValue: () => {
      return generateRandomName(); // this is presumably defined somewhere
    }
  },
  // ...
});
// ...
```

For every other case, a hook works well. E.g. a "default element" in a potentially already defined array:

```js
// ...
const Coffee = db.define('coffee', {
  // ...
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  // ...
});
// ...
Coffee.beforeSave(instance => {
  if (instance.ingredients.includes('love')) return;
  instance.ingredients.push('love');
});
// ...
```

Or also for dynamic values that are based off of something asynchronous:

```js
// ...
const Coffee = db.define('coffee', {
  // ...
  price: {
    type: Sequelize.INTEGER
  },
  // ...
});
// ...
Coffee.beforeSave(async instance => {
  const price = await getMarketPriceFromSomeAPI(); // this is presumably defined somewhere
  instance.price = price;
});
// ...
```
