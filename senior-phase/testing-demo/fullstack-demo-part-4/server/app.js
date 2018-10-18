const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const usersRouter = require('./routes/users');
const friendsRouter = require('./routes/friends');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/users', usersRouter);
app.use('/api/friends', friendsRouter);

module.exports = app;
