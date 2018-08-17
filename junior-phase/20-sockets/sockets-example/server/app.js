const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const db = require('./db')
const app = express()
const PORT = 3000

// Logging middleware
app.use(morgan('dev'))

// Body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err.message)
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

db.sync().then(() => console.log('The database is synced'))
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

// socketio: function to create socket command center for your server
// io: socket command center
const io = socketio(server)

io.on('connection', (client) => {
  // client (sometimes also called socket): represents a client (browser) who is talking to us
  console.log('Welcome: ', client.id)

  client.on('somebodyClicked', (payload) => {
    console.log(payload)
    client.broadcast.emit('aClickHappened')
  })
})

