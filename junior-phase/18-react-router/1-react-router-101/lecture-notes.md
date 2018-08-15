## the document fragment in the URL (`#` and everything after it)

Changes to the document fragment in the URL bar DO NOT CAUSE A PAGE REFRESH IN BROWSERS (instead browser default to "anchor scrolling" to the element with a matching id).

## history API

A tool (modern) browsers have built-in to manipulate the URL bar from our Javascript code, and we can change the URL WITHOUT CAUSING A PAGE REFRESH.

For example, we can do:

```js
history.pushState({}, '', '/foo');
```

...and it will change the URL to `/foo` but not trigger a page refresh.

## why do we want to update the URL bar?

- Backwards / forwards behavior in browsers
- Ability to share / bookmark URLs ("Check out this cool article I found")
- Expressive URLs so that a user can look up to the address bar and know "where they are"

*Note: our express API routes don't come into play directly here—they are only ever used for background requests and have no relationship to the URL bar*
