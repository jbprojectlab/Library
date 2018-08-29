const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/1807-curriculum-review');
module.exports = db;

require('./user');
