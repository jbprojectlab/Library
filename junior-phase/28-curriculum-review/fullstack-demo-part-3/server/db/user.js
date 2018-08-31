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

User.prototype.getFriends = async function () {
  const friendRows = await db.model('friend').findAll({
    where: {
      [Sequelize.Op.or]: [{
        userAId: this.id
      }, {
        userBId: this.id
      }]
    }
  });
  const thisUsersFriendUserIds = friendRows.map(friendRow => {
    if (friendRow.userAId === this.id) {
      return friendRow.userBId;
    } else {
      return friendRow.userAId;
    }
  });
  return User.findAll({
    where: {
      id: {
        [Sequelize.Op.in]: thisUsersFriendUserIds
      }
    }
  });
};

module.exports = User;
