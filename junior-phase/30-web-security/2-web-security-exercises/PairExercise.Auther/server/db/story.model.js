const Sequelize = require('sequelize')

const db = require('./_db')

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  paragraphs: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})

module.exports = Story
