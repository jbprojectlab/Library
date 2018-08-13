const express = require('express');
const path = require('path');

const { Hat } = require('./db');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/hats', async (req, res, next) => {
  try {
    const hats = await Hat.findAll();
    res.send(hats);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
