const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/1807-full-stack-testing-lecture-demo', {
  logging: false
});

const Hat = db.define('hat', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: Sequelize.TEXT,
});

module.exports = { db, Hat };
