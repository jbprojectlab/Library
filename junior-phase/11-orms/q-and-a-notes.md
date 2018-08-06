## how we're constructing HTML

The way we are currently doing this in wikistack is going to be old soon. Instead of "HTML templating" with these custom functions on the *server* side, we'll be switching to "HTML templating" with react on the *client* side.

Nevertheless, it's wortwhile to talk about this stuff right now.

For example, we've got this route handler:

```js
// ...
const { main } = require("../views");
// /wiki
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages)); // <= NOTICE THIS
  } catch (error) { next(error) }
});
// ...
```

And this over in `../views/main.js`:

```js
const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>`);
```

Inside out, below is our HTML string:

```js
`
  <h3>Pages</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>`
```

We use the `html` template tag on it to escape any problematic pieces (such as script tags).

```js
html`
  <h3>Pages</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>`
```

Then we pass this `layout`:

```js
layout(html`
  <h3>Pages</h3>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>`);
```

`layout` takes a string (of HTML) and returns a string (of HTML). It will embed some "content HTML" inside of the shared layout (also an HTML string) for all views.

## sequelize operators, e.g. `in`

[Sequelize operators](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators) give you more expressive / flexible querying. A powerful tool that is *sometimes* very useful.

An example, using `in` (and our wikistack `Page` model):

```js
Page.findAll({
  where: {
    title: {
      [Sequelize.Op.in]: ['Anolis carolinensis', 'Uta stansburiana']
    }
  }
});
```

Which will find all pages where the title is *in* the set of {Anolis carolinensis, Uta stansburiana}.

Or here's an example with `gt` (pretend we have a `likeCount` field):

```js
Page.findAll({
  where: {
    likeCount: {
      [Sequelize.Op.gt]: 100
    }
  }
});
```

Which will find all the pages where the like count is greater than 100.

## express debugging

- I don't know how to track / trace errors in node
- I don't know what the response is
- The response is not what I expect

*I don't know how to track / trace errors in node*

Things to know: you can check the **terminal** (specifically the one running your node process) for errors and the stack trace will help point you towards where the error occured. Also make sure to read the error message.

Also be on the look out for unhandled errors. Sometimes this will pop up as an "Unhandled promise rejection" (or something like that). This indicates there's an error *somewhere*—now what you need to track down, is where you are *not* handling errors. That's tricky, prevention is easier—make sure to always ask yourself (for any code) could this code error and what should happen if so.

*I don't know what the response is*

You should *always* be able to determine the response. Ask yourself: how are you sending the request?

- If it's from the browser: check the network tab!
- If you're using postman: this should have a "response" area.
- If you're using curl: the response is in the terminal.

If the server *never* sends a response, you should still be able to see an outgoing request in the network tab. Which indicates that the client sent a request but the server never responded.

*The response is not what I expect*

- Isolate very precisely, what line of code is sending the (unexpected) response. Not just guess / think about—actually confirm with `console.log` that a certain request triggers some `res.send(...)` somewhere in your codebase.
- If you're having trouble isolating it, starting putting `console.log`s in your middleware stack. This can help confirm that the execution flow of your express code is happening the way you expect it you.
- Once you've isolated it, trace that "unexpected value" backwards. E.g. if you are sending HTML but it is the wrong layout, where did that layout come from?

## `app.route`

This is a [cool utility in express](https://expressjs.com/en/api.html#app.route)—helps with code modularity, but is neither necessary nor particularly common out there.

Here's how it works:

```js
// ...
app.route('/wiki')
.get((req, res, next) => {
  // ...retrieve all pages
})
.post((req, res, next) => {
  // ...create a new page
});
// ...
```

Which is very similar to:

```js
// ...
app.get('/wiki', (req, res, next) => {
  // ...retrieve all pages
});
app.post('/wiki', (req, res, next) => {
  // ...create a new page
});
// ...
```

The `app.route` way is a nice for grouping related route handlers.
