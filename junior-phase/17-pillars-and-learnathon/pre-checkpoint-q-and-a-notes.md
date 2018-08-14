## passing a function to a prop

How do we know when to:

- Invoke it?
- Pass it as is?
- Wrap in an arrow function and invoke it?

For example, this component:

```jsx
const SinglePuppy = ({ puppy, listAll }) => (
  <div className="text-center">
    <img src={puppy.image} />
    <div>
      <h2>
        {puppy.name} (Age: {puppy.age})
      </h2>
      <button onClick={listAll}>List all Puppies</button>
    </div>
  </div>
);
```

Which we use like this (over in `Main`):

```jsx
// ...
<SinglePuppy puppy={this.state.selectedPuppy} listAll={this.listAll} />
// ...
```

Think about props as having an "expected" type based on how they'll get used. For props that are internal react ones (like `onClick`) we need the docs to be sure, for props we define, we can look at our own code for that component to be sure.

Primary example again with `onClick`, `onClick` takes a *function*. You should ALWAYS pass it a *function*. What that means is that you should be careful, below is usually an anti-pattern:

```jsx
<button onClick={someFunction()}>Click me</button>
```

Above we are invoking `someFunction` and passing THE RESULT OF `someFunction()` to `onClick`. We are not passing `someFunction` itself, but rather its `return` value.

If you want to control what parameters `someFunction` receives, well then you have to invoke it in your own code, so maybe we should do:

```jsx
<button onClick={someFunction(someData)}>Click me</button>
```

BUT THAT'S STILL THE SAME ANTI-PATTERN. Instead what should we do?

```jsx
<button onClick={() => someFunction(someData)}>Click me</button>
```

The above will work!

## `{returning: true}`

This is especially useful when using `sequelize`'s model update method, if you want to receive the result of the update (by default SQL will not give back the result after updating).

```js
// ...
const result = await Puppy.update(req.body, {
  where: {
    id: req.params.id
  },
  returning: true
});
console.log(result[1][0]); // will show the updated instance
// ...
```

Without `returning: true` we would have a problem

```js
// ...
const result = await Puppy.update(req.body, {
  where: {
    id: req.params.id
  }
});
console.log(result[1][0]); // will be `undefined` or maybe an error
// ...
```

You can also use destructuring syntax to grab the updated instance (just different syntax):

```js
// ...
const [updatedCount, [theUpdatedInstance]] = await Puppy.update(req.body, {
  where: {
    id: req.params.id
  },
  returning: true
});
console.log(theUpdatedInstance); // will show the updated instance
// ...
```

## how to update db on request

An example:

```js
// ...
app.post('/api/puppies', async (req, res, next) => {
  try {
    // we will frequently access information from the request body and pass it to the relevant method (`.create` / `.update`):
    const puppy = await Puppy.create({ name: req.body.name });
    // for POST we will have a 201 status (normally), and send the updated instance as JSON back to the client
    res.status(201).json(puppy);
  } catch (err) {
    // if any errors occur, forward them to our error handling middleware
    next(err);
  }
});
// ...
```

## what returns promises

Generally these will come from internal tools, or externally pulled-in libraries that do "slow" operations in JS: e.g. `fetch`, `axios`, `pg`, `sequelize`.

You don't know for sure unless you check the docs on the thing.

## "properly compose asynchronous actions"

- proper use of `async` / `await` for any / all promises (or alternatively, `.then`)
- if you've got multiple asynchronous actions occuring, that you do them in series (sequential `await`s) or parallel (gather promises upfront then `Promise.all` on an array of those promises) as up-to-you
