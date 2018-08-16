const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/codys-clubhouse')

module.exports = db
