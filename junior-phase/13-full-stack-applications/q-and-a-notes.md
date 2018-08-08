## installing `devDependencies`

Should work: `npm install`

(When you `npm intsall`, npm checks whether the machine process's `NODE_ENV` environment variable is set to "production" and if it is it *does not* install the `devDependencies`. That should be false by default—as in, you should have either no `NODE_ENV` set locally, or it should be set to "development".)

## do we need `pg` and `pg-hstore`

You should still need `pg` whenever your Sequelize database connection string uses the postgres protocol, e.g. `new Sequelize('postgres://localhost/foobar')`.

`pg-hstore` should only be necessary if you're using the HSTORE postgres type (document / object type).

## how to cause a 500 on our server?

Another way to think about this is: *how do we get the following middleware to run?*

```js
// ...
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(errorPage(err));
});
// ...
```

Make it so there's no (matching) middleware above it? **Will not work**. Because we are not dealing with "ordinary" middleware, we're dealing with "error handling" middleware.

There are two ways to get to your error handling middleware:

1. In some middleware *upstream* of the error handling middleware (that matches for the request), that is not an `async` function `throw` an error. Express will forward that error to the next matching error handling middleware, and we usually just have the one.
2. In some middleware *upstream* of the error handling middleware, call `next` with an error object, i.e. `next(error)`. Express will forward that error to the next matching error handling middleware, and we usually just have the one.

**2** is the way to go!

## git flow with 3 humans

*When forking...*

Do the same thing as for pairs, but add *both* partners' remote GitHub URLs (each of their forks).

*When creating a brand new repo...*

Add each other as collaborators, and all of you clone from that ONE repo.
