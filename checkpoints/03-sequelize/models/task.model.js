'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

const Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  due: Sequelize.DATE
});

Task.clearCompleted = function () {
  return Task.destroy({
    where: {
      complete: true
    }
  })
}

Task.completeAll = function () {
  return Task.update({
    complete: true
  }, {
    where: {
      complete: false
    }
  })
}

Task.prototype.isOverdue = function () {
  return !(this.getTimeRemaining() > 0 || this.complete)
}

Task.prototype.getTimeRemaining = function () {
  if (!this.due) return Infinity
  return this.due - new Date()
}

Task.prototype.addChild = function (newTask) {
  return Task.create({
    parentId: this.id,
    name: newTask.name
  })
}

Task.prototype.getChildren = function () {
  return Task.findAll({
    where: {
      parentId: this.id
    }
  })
}

Task.prototype.getSiblings = function () {
  return Task.findAll({
    where: {
      parentId: this.parentId,
      id: {
        [Sequelize.Op.ne]: this.id
      }
    }
  })
}


Task.belongsTo(Task, {as: 'parent'});


//---------^^^---------  your code above  ---------^^^----------

module.exports = Task;

