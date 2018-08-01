## other middleware (besides logging)

- static file serving middleware (which we've seen)
- "body parsing" middleware (provides `req.body` which corresponds to the request's payload / body)
- session middleware, helps us keep track of the client making the request
- passport middleware, helps us keep track of the currently logged in user, and helps us with OAuth

## node_modules (and storage / efficiency)

"Am I just going to have a bunch of GB of node_modules on my computer?"

"Yes."

[Inspired by a true story](http://devhumor.com/media/node-modules-1).

You can run a script every once in a while that deletes all your node_modules.

In terms of making `npm` more efficient: there are probably efforts on this.

## `__dirname` vs. `process.cwd()`

(Not a crucial distinction, but here it is anyway...)

`__dirname` is the folder path for the file for the LINE OF CODE YOU ARE EXECUTING RIGHT NOW.

`process.cwd()` is the folder where you "kicked off" this node process. It is entirely based off how the line-of-code-you-are-executing-right-now was initiated. I.e. whatever folder you did `node file.js` that folder is the `process.cwd()`.

## static middleware and relative vs. absolute paths

Side question: is `__dirname` a relative or absolute path? *It's absolute*.

When creating static file middleware with `express.static` you can user relative OR absolute paths.

I advise using absolute paths whenever possible (they're simpler / more straightforward to log / reason about).

## contacentaing to get an absolute path

You can manually add `/`s where they need to be, i.e.:

```js
console.log(__dirname + "/public");
```

You can also use a library to help out, the built-in node module `path`:

```js
const path = require('path');
console.log(path.join(__dirname, "public"));
```

The latter has one key advantage: it is OS agnostic.

## syntax for template literals

How do we "make" a template literal? Backticks:

```js
console.log(`a tempalte literal`);
```

They're useful when a part of the "string" (template literal) we are constructing is variable:

```js
const place = 'Fullstack';
// ...
console.log(`Welcome to ${place}`);
```

Notice we use dollar sign then open bracket then our variable portion then close bracket. Note, the above is equivalent to:

```js
const place = 'Fullstack';
// ...
console.log('Welcome to ' + place);
```

## tagged template literals

You can specify a "tag" (which is a function) that modifies how a template literal is constructed. [See here for more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).

About the `html` one we use, for example (using `postList.js` from Wizard News Part I):

```js
const timeAgo = require("node-time-ago");
const html = require("html-template-tag");

module.exports = posts => html`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => html`
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
        </div>`
      )}
    </div>
  </body>
  </html>`;
```

The `html` template tag is "escaping" certain undesirable content from the HTML we construct. It helps prevent Cross-Site Scripting (XSS), where one user is able to specify code that other users then execute on their browser.

We will talk more about XSS *way* later.
