const Sequelize = require('sequelize')

const databaseURI = process.env.DATABASE_URL || 'postgres://localhost:5432/auther'

const db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
})

module.exports = db
