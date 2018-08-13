const Sequelize = require('sequelize');
const moment = require('moment');

const db = new Sequelize('postgres://localhost/puppybook', { logging: false });

const Puppy = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    defaultValue: 'https://loremflickr.com/400/400/dog',
  },
  DOB: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date(),
  },
}, {
  getterMethods: {
    age() {
      if (!this.DOB) return 'Unknown';
      const today = new Date();
      const birthdate = new Date(this.DOB.split());
      const totalMonths = moment(today).diff(moment(birthdate), 'months');
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years}yr ${months}mo`;
    },
  },
});

module.exports = db;
