'use strict';

let tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function (name, task) {
    // saves a task for a given person
    // check validity, error if invalid
    if (!task.content) {
      throw new Error('Content is required when creating a new task');
    }
    if (!task.hasOwnProperty('complete')) {
      task.complete = false;
    }
    if (!tasks[name]) {
      tasks[name] = [task];
    } else {
      tasks[name].push(task);
    }
    return task;
  },
  list: function (name) {
    return tasks[name];
  },
  complete: function (name, taskIndex) {
    tasks[name][taskIndex].complete = true;
  },
  remove: function (name, taskIndex) {
    tasks[name].splice(taskIndex, 1);
  }
};
