const app = require('express')()
const path = require('path')
const session = require('express-session')

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'))

app.use(require('./body-parsing.middleware'))

app.use(session({
  secret: 'winGARdium leviOHsa',
  resave: false,
  saveUninitialized: false
}))

app.use(require('./passport.middleware'))

// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api'))
app.use('/auth', require('../auth'))

const validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login']
const indexPath = path.join(__dirname, '..', '..', 'public', 'index.html')
validFrontendRoutes.forEach((stateRoute) => {
  app.get(stateRoute, (req, res) => {
    res.sendFile(indexPath)
  })
})

app.use(require('./statics.middleware'))

app.use(require('./error.middleware'))

module.exports = app
