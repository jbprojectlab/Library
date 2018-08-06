/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr', {
    logging: false, // no more SQL in terminal
    operatorsAliases: Sequelize.Op, // silence operator warning
})

const { STRING, INTEGER, BOOLEAN, DATE } = Sequelize

const Gardener = db.define('gardener', {
    name: STRING,
    age: INTEGER,
})

const Plot = db.define('plot', {
    size: INTEGER,
    shaded: BOOLEAN,
})

const Vegetable = db.define('vegetable', {
    name: STRING,
    color: STRING,
    planted_on: DATE,
})

Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)

Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' })
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' })

Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' })

module.exports = db
