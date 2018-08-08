'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');
module.exports = app; // this line is only used to make testing easier.

// body parsing middleware below assigns the `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// remember to plug in your router and any other middleware you may need here.
app.use(routes);

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
