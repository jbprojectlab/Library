const { join } = require('path')
const volleyball = require('volleyball')
const express = require('express')
const handle = require('express-async-handler') // adds `catch(next)` to async middleware
const homePage = require('./views')
const gardenerPage = require('./views/gardener')
const { gardener: Gardener } = require('./models').models

const app = express()

app.use(volleyball)
app.use('/styles', express.static(join(__dirname, 'node_modules/bulma/css')))

const sendHomePage = handle(async (req, res) => {
    const gardeners = await Gardener.findAll()
    res.send(homePage(gardeners))
})

app.get('/', sendHomePage)
app.get('/gardeners', sendHomePage)

app.get(
    '/gardeners/:id',
    handle(async (req, res) => {
        const gardener = await Gardener.findById(req.params.id, {
            include: [{ all: true, nested: true }],
        })
        res.send(gardenerPage(gardener))
    })
)

app.listen(1337, () => {
    console.log('listening on http://localhost:1337')
})
