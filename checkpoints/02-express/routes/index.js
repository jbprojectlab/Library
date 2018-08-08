'use strict';

const express = require('express');
const router = express.Router();
module.exports = router;

const Todos = require('../models/todos');

router.get('/users', (req, res) => {
  res.send(Todos.listPeople());
});

router.get('/users/:name/tasks', (req, res, next) => {
  const tasks = Todos.list(req.params.name);
  if (!tasks) {
    next();
    return;
  }
  if (req.query.status) {
    const filteredTasks = tasks.filter(task => {
      if (req.query.status === 'complete') {
        return task.complete;
      } else if (req.query.status === 'active') {
        return !task.complete;
      } else {
        return true;
      }
    });
    res.send(filteredTasks);
  } else {
    res.send(tasks);
  }
});

router.post('/users/:name/tasks', (req, res) => {
  let newTask;
  try {
    newTask = Todos.add(req.params.name, req.body);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
  res.status(201).send(newTask);
});

router.put('/users/:name/tasks/:index', (req, res) => {
  Todos.complete(req.params.name, req.params.index);
  res.sendStatus(200);
});

router.delete('/users/:name/tasks/:index', (req, res) => {
  Todos.remove(req.params.name, req.params.index);
  res.sendStatus(204);
});
