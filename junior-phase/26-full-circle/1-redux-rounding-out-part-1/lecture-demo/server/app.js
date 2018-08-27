const path = require('path');
const express = require('express');
const volleyball = require('volleyball');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(express.static(path.join(__dirname, '..', 'public')));

const allScores = [];
app.get('/api/scores', (req, res) => {
  res.json(allScores);
});
app.post('/api/scores', (req, res) => {
  allScores.push(req.body);
  res.status(201).end();
});

module.exports = app;
