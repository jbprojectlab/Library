## priorities leading into day one of senior phase

Most important ish:

1. Rest, sleep
2. PEP

Secondary:

3. Boilermaker
4. Codewars

## portfolio enrichment piece

*Scoping the project*

Start with whatever idea is most exciting to you, even if it's HUGE. Once you've done that now find the absolute smallest version that would still be interesting.

*How to get started?*

Build out a prototype as quickly as possible with as much simplicity as possible. If there are new technologies, reach out to an instructor or fellow about it. Outline the article / video / whatever you're going to publish / present about this thing.

## create-react-app with a server

[`create-react-app`](https://github.com/facebook/create-react-app) is a command line tool that generates a ready-to-go react project. So that you don't have to remember all the various boilerplate / configuration / setup to get started with react.

It will also create its own dev server that it defines and runs. There's no place for you to "edit" the code of that server. There's no express code anywhere or anything like that.

So if you want to define custom server behavior (API routes, sequelize backend, etc) you should probably `eject` your `create-react-app` project. From there you'll also have to now make your own server boilerplate / configuration / setup and rewire the various start scripts to use that.

Another alternative the (canonical) boilermaker solution: https://github.com/FullstackAcademy/boilermaker/.

## how important is it to know how to build a starting point?

It's important to understand all of your source code. Even tools that are only involved in the setup of your application (like webpack, babel): it's important to understand why they are there and what they do.

But you do not have to memorize exactly how to configure every different tool that you use. It is more important that you know how to find / evaluate good defaults.

## entry execution flow / file organization and relationships

At thist point, we have one compile entry point: our browser index / start source code file. We have to point webpack to this so that it can create our bundle.

A compile entry point means we run through that to create the bundle, *but not actually execute it*. Execution entry points are about when / how / where our code actually executes.

We have three execution entry points:

- We start our express server, this happens in the terminal (node runtime environment)
- We initialize our react app, this happens in the browser (browser runtime environment)
- We run our tests, this happens in the terminal (node runtime environment, via mocha)

Some important execution setup that needs to run when our server starts:

- Configure our express app with any middleware / route handlers that we want
- Make our express app start listening on a port
- Define our sequelize models / associations
- Establish database connection
- Make our sequelize models correspond to tables in the database
- When a client makes a request to `/` they receive index.html which also will cause them to load / run the bundle

Some important execution setup that needs to run when our browser code starts:

- Render our react app to the actual DOM
- Define our react components
- Presumably one (or many) component(s) will get rendered that might load data by making an AJAX request to the server in a `componentDidMount` hook
- Define our redux store, via our root reducer
- Define a bunch of `Route`s that will render for certain URLs

## using frontend state, how to successfully cache?

There are two hard things in programming:

- Naming things
- Cache invalidation
- Off-by-one errors

Cache: local data you're storing that ultimately should be synchronized with some remote data (its source). Caching is useful because the data is at hand. Caching is difficult because of managing the synchronization.

This frequently shows up if we're trying to define a react component that needs access to a single database record to properly display.

- Option 1: go get the data from the cache ONLY. Good because it's fast, but bad because it is potential inaccurate. The cache might not have the most up-to-date info.
- Option 2: go get the data from the server ONLY. Good because we get the most up-to-date info, but bad because it's slow and puts more strain on our server.
- Option 3: only get the data from the server if it's not in the cache. Good because it's fast if we already have it, bad because it still doesn't necessarily access up-to-date information.
- Option 4: get the data from the server if it's not in the cache, or if we haven't fetched in some amount of time. This is us throttling requests, so that they can only happen so frequently. Good because it's fast usually, and slow only occasionally, but still remains relatively up-to-date (based on that timeout above). Bad because it is more complex to code.

## functional programming in our everday use

These three things haven't show up outside of that day (at least not really):

- composition / piping
- currying
- point-free programming

This stuff has become pretty mundane:

- immutability (transforming / copying data in redux)
- higher order functions

How to incorporate some of that stuff from above:

*composition and piping: composing selectors is pretty cool pattern*

Maybe something like instead of:

```js
// ...
const mapStateToProps = (state, ownProps) => ({
  allOtherUsers: state.users.filter(eachUser => eachUser.id !== getId(ownProps)),
  user: singleUserSelector(state.users, getId(ownProps))
});
// ...
```

We could have:

```js
// ...
const mapStateToProps = selectorCompose(
  otherUsersSelector,
  singleUserSelector
);
// ...
```

Where the missing piece here is `selectorCompose` (and there might be a library for this).

We are using "manual composition" all over the place already. Anywhere we are calling a function inside of another function or rendering a component inside of another component we are "manually composing" them.

Any place where we have redundant code we might abstract out. Like with `EditUser` and `SingleUser` in our fullstack demo from the curriculum review, we might define a higher order component:

```jsx
// ...
<LoadThisUser component={SingleUser} />
// ...
<LoadThisUser component={EditUser} />
// ...
```

## some common JS libraries / tools / APIs

- [apify](https://www.apify.com/) (service): allows you to scrape views from anywhere online and "reshape" / "reformat" that view into data that you can use a source. Sort of a way to make any content on the web your "database" / "API".
- [rx.js](https://rxjs-dev.firebaseapp.com/guide/overview) (universal): functional reactive programming. Really digs into the idea of an "Observable". An observable is like an event emitter, but has a value that changes over time. Observables are to event emitters what promises are to error-first callbacks. In a way, it could be a replacement for redux (inexact).
- [lodash](https://lodash.com/) (universal): utility function library for dealing with objects and arrays. Provides a bunch of operations for transforming / traversing / combining data in various formats. Enhances what you can do easily with arrays / objects.
- [three.js](https://threejs.org/) (frontend): a library for dealing with 3D space and objects in your browser.
- [next.js](https://nextjs.org/docs/#setup) (backend): react server side rendering. Allows you to render react code as HTML on your server and *then* send it to the frontend. This can be useful for non-single-page applications, but it is also for single page applications, most especially the "entry" request.
- [docker](https://www.docker.com/) (backend): a command line tool (independent of JS) that allows you to define / run / stop "containers". Containers are these isolated and standardized "environments" to execute code / tasks. Containers are light-weight and reusable.
- [p5.js](https://p5js.org/) (frontend): browser library for displaying (interactive) graphics. Common when creating interesting visualizations / animations / games.
- [meteor](https://www.meteor.com/) (universal): framework for building software with Javascript. It aims to be a one-stop-shop for the frontend / backend / testing / environment / anything about your application. Especially attempts to simplify the relationship between the server and the client. Especially attempts to be platform agnostic, normalize / standardize across differente devices / browsers.

## how to quickly try things out

For react components (where we don't care about how it intergrates with data from some server): `create-react-app`. Codepen and the like are also good, and they're shareable.

For servers: express boilerplate scaffolding tool ("express generator").

Boilerplate generators out there: http://yeoman.io/.
