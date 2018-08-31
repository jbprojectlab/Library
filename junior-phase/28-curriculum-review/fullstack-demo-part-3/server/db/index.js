const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/1807-curriculum-review', {
  logging: false
});
module.exports = db;

const User = require('./user');
const Friend = require('./friend');

Friend.belongsTo(User, {as: 'userA'});
Friend.belongsTo(User, {as: 'userB'});
