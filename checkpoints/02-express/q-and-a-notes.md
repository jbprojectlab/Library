## difference between `express.json` and `express.urlencoded` body parsers

`express.json` can parse request bodies that are in JSON format.

`express.urlencoded` can parse request bodies that are in URL encoded format.

*When to use one versus the other?*

First off: the request body is defined *entirely* by the client. That includes the format of the request body.

If any clients will send a request body formatted as JSON, we should use `express.json`.

If any clients will send a request body formatted with URL encoding, we should use `express.urlencoded`.

(If some clients will do one, some clients another, we should use *both*.)

Forms typically default to URL-encoded format, AJAX requests often will use JSON format.

## `Cannot set headers after they are sent to the client`

You see this error if your express middleware ends up sending a *second* response (which it should not do). Every request should have *exactly* one response.

Even though you may send a response, your Javascript code will continue to execute. So `res.send` does not "kill" or "stop" your program execution.

## `req.query`

Can we have spaces in the query string? (From the client side, i.e. when the client formats the query string.) I think not, but I'm not 100%.
