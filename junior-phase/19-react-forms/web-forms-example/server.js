const {join} = require('path')
const express = require('express')
const app = express()
const index = join(__dirname, 'index.html')
const welcome = join(__dirname, 'welcome.html')
const PORT = 8080

// web 1.0
app.use(express.urlencoded({extended: false}))

// ajax
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.method, req.url)
  console.log('req.body: ', req.body)
  next()
})

app.post('/old-form', (req, res, next) => {
  console.log('Hi, ', req.body.firstname)
  res.redirect('/welcome')
})

app.post('/ajax-form', (req, res, next) => {
  console.log('Hi, ', req.body.firstname)
  res.json({hi: req.body.firstname})
})

app.get('/', (req, res, next) => {
  res.sendFile(index)
})

app.get('/welcome', (req, res, next) => {
  res.sendFile(welcome)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
