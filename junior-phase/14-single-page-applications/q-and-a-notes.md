## tripplanner file organization

Top-level "horizontal" distinction, a `client` and a `server` folder (for JS source code). Also a `public` folder for static files the client might want access to.

(Horizontal here means by "responsibility" / "role". As opposed to "vertical", which would mean "by feature". We'll talk about this more soon.)

Inisde `server` we've got another horizontal distinction, `models` and `routes` folders. We have `app.js` as the "entry" / initializing code (server side). (There are also some seed files.)

Inside `models` we have a file for each model definition, one for the *database alone* (`_db.js`) and one for the database PLUS the model definitions and their associations (`index.js`).

Inside `routes` just one file `index.js` containing all "API" / "data" routes.

Over inside `client` we've got `index.js` as the "entry" / initializing code (client side). We've also got `api.js` responsible for encapsulating AJAX communication with the server. And we've got `marker.js` which is a utility for creating marker objects to go on our map.

## file organization

There's no one true answer but there are plenty of people who feel dogmatic about one way or the other. Among many different camps, there's at least this one distinction: horizontal and vertical.

Example of horizontal:

```
server
  start.js
  app.js
  models
    cat.js
    dog.js
    index.js
  routes
    cat.js
    dog.js
    index.js
```

Example of vertical:

```
server
  start.js
  app.js
  cat
    model.js
    route.js
  dog
    model.js
    route.js
  db.js
```

What are the tradeoffs? Having things in the same folder means...

- when updating code, being able to find them easily together
- when importing / exporting, simpler and shorter paths
- committing to a mental categorization scheme
- those things can be moved around together more easily (e.g. when attempting to create either a standalone library / utility and /or a microservice)

Ask yourself questions related to the above tradeoffs / advantages. For example: *When I go to update my code am I more likely to update ALL things related to "cats", or am I more likely to update ALL things related to "models"?*

## which libraries will we commonly use and where (related to files)

Common libraries for us...

#### express

A node library for helping us define HTTP servers.

You are going to import this in some `app.js` server side, as well as any "route" files.

#### sequelize

A node library for helping us make SQL queries and SQL tables based off of object-oriented JS code.

You are going to import this in some `db.js` server side, as well as any "model" files; also seed files.

#### morgan / volleyball

A node library for helping us log any incoming HTTP requests. We plug them into our express app as middleware.

You are going to import either of these (presumably not both) in just one place, `app.js` (somewhere towards the "top" of your middleware stack).

#### body parsing

*Not* a node library, just a feature of express. (There's also a `body-parser` library that is a standalone body parser library, but we no longer use it much.)

You are going to use this in just one place, `app.js` (somewhere towards the "top" of your middleware stack).

#### bluebird

A promise library, universal (isomorphic)—you can use on the frontend or the backend (environment agnostic). Used to be more important, especially when `Promise`s were not a standard feature in Ecmascript. Still potentially useful because it provides a lot of promise utility methods.

You are (maybe) going to use this, but if so there's not one place for me to point to. You'll use it if you're managing complicated asynchronous control flow (either frontend or backend). (You still might see us use it in our solution code—a big part of that is historical.)

#### pg

A node library that allows us to send SQL queries to a postgres database server and receive responses.

You are going to import this NOWHERE. We don't *directly* use it. It is a "peer dependency" of sequelize, so in fact sequelize will import when sequelize runs its codes.

#### webpack

A node library, a compiler that bundles all of your (source) JS files so that your HTML can load one script. It gives us `require` / `module.exports` and `import` / `export` for our frontend Javascript.

You are going to use this from the command line, e.g. `webpack` from your terminal. Which will start the webpack compiler process and create that bundle.

#### nodemon

A node library that helps us restart our server side JS whenever a file changes.

You are going ot use from the command line, e.g. `nodemon` from your terminal.

### postgres

This is a service / software you can download. It comes with a program to run a postgres SERVER ("Postgres app") and (usually) a program to start a postgres CLIENT (`psql` in the terminal).

You can check whether "postgres is running" (i.e. the server is started) by trying to connect a client, e.g.: `psql` in the terminal.
