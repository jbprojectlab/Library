const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/users', usersRouter);

module.exports = app;
