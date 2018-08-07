## try again for 503 in CounterIntelligence

```js
async function theDoubleAgents() {
  // 1. `read` the double agents files
  //    /agent/0 through
  //    /agent/9
  // 2. Some of the reads will fail. Retry in case of error 503
  //    (server unavailable).
  //    DO NOT RETRY in case of error 404 (Not Found) - just skip those
  //    (they were either retired or gave up)
  // 3. `console.log` them (in any order)
  for (let i = 0; i < 10; i++) {
    const filepath = `/agent/${i}`;
    try {
      console.log(await read(filepath));
    } catch (error) {
      if (error.status === 503) {
        console.log(await read(filepath));
      }
    }
  }
}
```

Above we attempt to `read` each agent filepath once, then if it fails (because of a 503 status), we `read` it one more time. This pattern ("try twice") is not particularly common (for our purposes) because our servers will more often than not error *consistently*. Trying twice is only useful for inconsistent servers.

## destructuring binding

For example, in plantr, seed.js (line 35):

```js
// ...
const [carrot, tomato, pepper] = vegetables;
// ...
```

This is totally unrelated to sequelize, to promises, to async control flow. It is recent ES (Javascript) syntax for assigning variables from collections.

It allows you to "unpack" values from a collection and name them at the same time. Normally how we access and name values from an array:

```js
const arr = [20, 30, 40];
// ...somewhere else...
const a = arr[0];
const b = arr[1];
const c = arr[2];
// we can now use a, b, and c
console.log(a + b + c);
```

Destructuring allows a shorthand for the above:

```js
const arr = [20, 30, 40];
// ...somewhere else...
const [a, b, c] = arr; // destructuring!
// we can now use a, b, and c (in the same way as above)
console.log(a + b + c);
```

You might also see this for function parameters. The old way:

```js
function addFirstTwo (arr) {
  return arr[0] + arr[1];
}
```

The new (destructuring way):

```js
function addFirstTwo ([first, second]) {
  return first + second;
}
```

There's also object destructuring! Here's what we have done in the past:

```js
const obj = {foo: 'Hello', bar: 'World'};
// somewhere else
const foo = obj.foo;
const bar = obj.bar;
// now we can use foo and bar
console.log(foo + ' ' + bar);
```

Here's what we can do with object destructuring:

```js
const obj = {foo: 'Hello', bar: 'World'};
// somewhere else
const {foo, bar} = obj;
// now we can use foo and bar (same as above)
console.log(foo + ' ' + bar);
```

(And you can do the same thing for function parameters.)

## order of operations when seeding

(Before you're ready: define your models)

- connect to database
- drop existing tables (usually)
- create tables
- add your data, insert rows
- close database connection (even if anything above fails)

```js
// connect to the database
const db = new Sequelize('postgres://localhost:5432/plantr');
// ...
// drop existing tables (usually)
// create tables
db.sync({force: true})
.then(() => {
  // add your data, insert rows
  return seed(); // pseudocode
})
.finally(() => {
  // close database connection
  db.close();
});
```

## what is `Bluebird`

Bluebird is a promise library. It impements a `Promise` class with a [*bunch* of methods](http://bluebirdjs.com/docs/api-reference.html). Especially famous for speed and for its breadth of useful ways to express asynchronous control flow with promises.

It is built in to sequelize. Sequelize uses it by default as its `Promise` implementation. (Note: it's possible to override this in sequelize and provide a different one instead.)

## using `.then` properly to chain asynchronous tasks

Remember to `return` a promise inside each `.then` handler.

Let's say we've got `doThingA` and `doThingB` and `doThingC` all as functions that return promises (async functions).

```js
doThingA()
.then(() => {
  doThingB();
})
.then(() => {
  doThingC();
});
```

Notice any issues with what's above? The lack of `return`s means we will not properly await the completion of doing thing B before doing thing C.

Instead we should have:

```js
doThingA()
.then(() => {
  return doThingB();
})
.then(() => {
  return doThingC();
});
```

## `returning` property in sequelize

An example from plantr, seed.js (line 25):

```js
return Plot.bulkCreate(plotData, { returning: true });
```

Some "change" (insert, update, delete) operations in SQL will effect the change, BUT NOT RETURN THE CHANGED THING. In postgres, you can specify that you want to not only effect the change, but also receive the changed item(s) by doing `RETURNING *` (or something like).

So sequelize allows you (for postgres) to specify this option by doing `{returning: true}` for certain queries you can make. This means that your JS promise will resolve with the created / updated data (in addition to performing the create / update operation).
