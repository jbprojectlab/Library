const Sequelize = require('sequelize');

const db = require('.');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profilePhoto: {
    type: Sequelize.STRING,
    defaultValue: 'http://fillmurray.com/1000/1000',
    validate: {
      isUrl: true
    }
  }
});

module.exports = User;
