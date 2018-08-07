## what happens when I go to the URL bar type in `http://localhost:3000/wiki/` and press enter?

(A full stack trace)

- Browser somehow detects that we have entered new text into the URL bar
- Forms an HTTP request `GET localhost:3000/wiki/`
- THE INTERNET
- Server receives the request
- Goes through our middleware, piece by piece, i.e. all of the following match
  - `morgan("dev")` which logs the request then continues
  - `express.static(path.join(__dirname, "./public"))` which checks to see if `/wiki` is a file in the public folder (it isn't so we go on)
  - `express.urlencoded({ extended: false })` and `express.json()` which process / parse the request body, and assigns a property to the request object `.body` (an object) and continues
- Eventually we get to `app.use("/wiki", require("./routes/wiki"))` which matches the incoming request so now we check the route handlers for this "sub router", but when matching in the sub router DON'T include the `/wiki` part (because we already matched it)
- We come across:

```js
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) { next(error) }
});
```

- Which does match! (The remaining part—minus the `/wiki` we already dropped—is just `/`)
- The handler function runs
- We call `Page.findAll()`
  - `sequelize` forms a query to the database
  - `sequelize` passes it off to `pg` which sends that query to the database
  - Presumably the postgres database server recieves this query and sends back SQL text representing the result
  - `pg` parses that SQL result into an array of objects
  - `sequelize` converts each of those objects into `Page` instances
- The promise we are awaiting resolves with that array from above, we assign it to the constant `pages`
- We pass those `pages` into `main`
  - Which generates HTML
  - It does so partially with the help of `html-template-tag` and uses `layout` (shared structure across various pages)
- We send that HTML back as the response (we call `res.send(...)` on it)
- Express formats our HTML into an actual HTTP response
- THE INTERNET
- Browser receives response, which is HTML
- Browser parses and renders that HTML, producing a DOM, and more importantly painting pixels to the user's screen
- The user pays us tons of money!
