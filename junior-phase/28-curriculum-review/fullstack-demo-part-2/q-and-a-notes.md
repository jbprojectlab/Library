## browser router vs. hash router

This exact terminology is *very* react-router. So "browser router" isn't really a universal Javascript term. Same with "hash router".

On the other hand, what they represent is more universal. The browser router represents *using the history API to manage the URL bar in Javascript (without causing browser refresh)*. The hash router represents *using the document fragment (everything after the #) to manage the URL bar in Javascript (without causing browser refresh)*.

So the difference is browser router uses the history API, hash router uses the document fragment.

- history API advantage: will allow for no `#` in the URL (on less character for users to type, potentially less "scary" URL for non-technical users)
- history API avantage: will allow for the `#` to work in its default way, anchor scrolling to a element with the matching id (e.g. `https://en.wikipedia.org/wiki/Robert_I,_Count_of_Dreux#Ancestry`)
- document fragment advantage: compatible with older browsers (becoming less of an advantage: https://caniuse.com/#search=history)
- document fragment advantage: does not require "special" behavior on the server side

About special behavior mentioned above. If we're using the history API, we might have URLs that look like: `http://ourdomain.com/dogs/1`. AND a user might enter our site for the first time by visiting that URL. If so, the serve will need to send ~JSON~ **index.html** (which in turn runs bundle.js). The server does not know what our "valid frontend routes" are. So a common behavior is for the server to send back index.html for ANY request that doesn't otherwise match. Our express app might have something that looks like:

```js
// ...
app.get('*', (req, res) => {
  res.sendFile(pathToIndexHtml);
});
// ...
```

This middleware would / should be at the bottom of our middleware stack, and sort of replaces our ordinary `404` middleware:

```js
// ...
app.use((req, res) => {
  res.sendStatus(404);
});
// ...
```

As opposed to with document fragment. If we're using the document fragment, we might have URLs that look like: `http://ourdomain.com/#/dogs/1`. And a user might enter our site for the first time by visiting that URL. BUT the browser will send a request to the server that looks like `http://ourdomain.com/`—it WILL NOT INCLUDE THE HAS OR ANYTHING AFTER IT. The server does not need to "send index.html" by default, it just needs to send it for "one" route, `/`.

## what happens when I type `http://localhost:5000/#/people` into the URL bar and press enter?

- MAGIC (true)

Also...

- ignores the hash
- the browser forms a request `GET http://localhost:5000/`
- THE INTERNET
- server receives request
- goes through our body parsing middleware, logging middleware
- then hits our static file serving middleware `express.static(path.join(__dirname, '..', 'public'))`
- static file serving middleware attempts to find a file called `index.html` in the public folder (default behavior when the URL ends in `/`)
- and it finds it
- server sends back `index.html`
- THE INTERNET
- browser parses and renders the HTML
- browser processes `<script defer src='/bundle.js'></script>`
- browser makes a request for bundle.js
- ...same stuff as above happens, but this time server sends `bundle.js`
- browser executes `bundle.js`
- creates the store (via an import chain leading to `createStore(rootReducer, applyMiddleware(loggingMiddleware, thunkMiddleware))` over in store.js)
- renders our react copmonents to the actual DOM (because of `ReactDOM.render(<Main />, document.getElementById('react-app'))` over in browser/start.js)
- so `Main` renders
- we render `Provider`, which provides the store for any lower components that are `connect`ed
- we have our `Switch` and `Route`s which react router DOM will render for us based on the "frontend path" / "frontend route", which is currently `/people` (everything in the URL bar after the has, because we're using hash router)
- which renders `AllUsers`
- initial rendering: displays no list of info to the user
- then the component mounts, `componentDidMount` hook runs
- fires off `this.props.loadUsers()`
- which does `dispatch(fetchUsers())`
- which does `axios.get('/api/users')` (over in reducers/users.js)
- after that promise resolves, we `dispatch(receiveUsers(users))` (where users is the response data)
- redux sends that action to our reducer which runs and updates the store state
- store state was: `{users: []}`
- store state is now: `{users: [/* this has data in it */]}`
- the store state has updated, so our `ConnectedAllUsers` (made via `connect`) is subscribed to the store so it re-renders and calls mapStateToProps
- which passess certain props to `AllUsers`, which re-renders
- specifically passes `{list: [/* that same data from our storeState.users */]}`
- displays a list of user info on the view!
- fin.
