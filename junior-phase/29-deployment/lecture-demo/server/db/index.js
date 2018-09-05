const db = require('./_db')

const Story = require('./story.model')
const User = require('./user.model')

User.hasMany(Story, {
  foreignKey: 'author_id',
  onDelete: 'cascade', // remove all associated stories
  hooks: true // makes the cascade actually work. Yay Sequelize!
})
Story.belongsTo(User, {as: 'author'})

module.exports = db
