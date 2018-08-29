## serialize user and deserialize user

The term "serialize" tends to mean *convert a thing from a rich, living format to a simple format*, and "deserialize" tends to mean *convert a thing from a simple format into a rich, living format*.

"Serialize user" and "deserialize user" are passport session processes / operations.

**Serialize user...**

The "user serialization process" happens when somebody has successfully "logged in" (i.e. google has hit our OAuth callback URL with a successful response). It stores *something about the user* on the express session so that later, we can use that *something* to look up that user. Ordinarily that will be the user's id, that's what we're going to do.

We have to tell passport what the *something* is by passing it to "done":

```js
// ...
passport.serializeUser((user, done) => {
  // this code indicates the the "something" we are going to store on the session is the user's id
  done(null, user.id);
});
// ...
```

A little bit more about "done". This is a callback that passport provides to us, and we are expected to invoke it with an error if there was one (as the first argument) and with the relevant data (as the second argument).

Why not just store the whole user? What could go wrong?

- saves space to store just an id
- the user data could change! we have data redundancy issues if we store the whole user—if we ever update a user row in the database we also for safety will have to update that user in all session objects that contain them
- objects are not generally easy to store in a file

**Deserialize user...**

The "user deserialization process" happens when for EVERY REQUEST, via our `passport.session()` middleware. It stores the actual user instance (NOT JUST THE ID) as `req.user` so that downstream middleware / route handlers can access it. The problem is, passport does not know how to convert what we've serialized (again, generally the user id) into an actual user instance.

We have to tell passport how to convert an id to a user by passing the user to "done":

```js
// ...
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
// ...
```

A little bit more about "done". This is a callback that passport provides to us, and we are expected to invoke it with an error if there was one (as the first argument) and with the relevant data (as the second argument).

## `history.push`

The `history` object in general comes from react router! It is provided as a prop to any component that react router renders, e.g. `Foo` below will have `props.history`:

```jsx
// ...
<Route component={Foo} />
// ...
```

The `history` object is for interacting with the browser navigation history. It allows us to change the URL bar (without causing a page refresh), go back, go forward.

`histor.push` will be the most common we use and it changes the URL bar. E.g.:

```js
// ...
history.push('/the-good-place'); // absolute path
// ...
```

Then URL bar would change to /the-good-place. We could do a relative path:

```js
// ...
history.push('./other-place'); // relative path
// ...
```

This is useful when we want to imperatively change the URL via Javascript code.

This `history` object is closely related the ["history API"](https://developer.mozilla.org/en-US/docs/Web/API/History) that (modern) web browsers implement.

## when do we need to await?

*Why do we (sometimes) need to await something that we're "already" awaiting?*

Code snippets, first over in our store.js:

```js
// ...
export const logout = () => {
  return async dispatch => {
    await axios.delete('/auth/logout');
    dispatch(gotMe({}));
  };
};
// ...
```

Over in user-page.js:

```js
// ...
return {
  async handleClick () {
    const thunk = logout();
    await dispatch(thunk);
    history.push('/');
  }
};
// ...
```

If instead we had...

```js
// ...
return {
  handleClick () {
    const thunk = logout();
    dispatch(thunk);
    history.push('/');
  }
};
// ...
```

...what would happen? The `history.push('/')` would occur immediately after `dispatch` but would not wait for whatever that thunk is doing.

So the rule: you need to `await` anywhere that you want something (B) to happen after something (A) where A is asynchronous / a promise.

## "extra argument"

```js
// ...
const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware.withExtraArgument({axios}));
const store = createStore(reducer, middlewares);
// ...
```

This will allow us to access `axios` as the third argument in our thunks.

```js
// ...
const fetchLife = () => {
  //                                vvvvv
  return async (dispatch, getState, axios) => {
    //                              ^^^^^
    // ...
    await axios.get('/living-things');
    // ...
  };
};
// ...
```

The use case for this is having "render time dependencies" instead of "execution time dependencies".

Render time dependencies are especially useful when the root rendering process might happen many times. For example, if we were to use react on the server side to render HTML strings.

This is tricky stuff and not terribly central either.
