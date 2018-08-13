const express = require('express');
const volleyball = require('volleyball');
const path = require('path');

const Puppy = require('./db').models.puppy;
const app = express();

app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/puppies', async (req, res, next) => {
  try {
    const puppies = await Puppy.findAll();
    res.json(puppies.map(({id, name}) => ({id, name})));
  } catch (err) {
    next(err);
  }
});

app.get('/api/puppies/:id', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.id);
    if (!puppy) res.sendStatus(404);
    else res.json(puppy);
  } catch (err) {
    next(err);
  }
});

app.post('/api/puppies', async (req, res, next) => {
  try {
    const puppy = await Puppy.create({ name: req.body.name });
    res.status(201).json(puppy);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
