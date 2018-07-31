const express = require('express');

const app = express();

// logging middleware (example of `.use` and `next`)
app.use((req, res, next) => {
  console.log('incoming request:', req.method, req.url);
  next();
});

// static file serving middleware
const middleware = express.static(__dirname + '/public-files-the-client-might-want');
app.use(middleware);

// using `req.params`
app.get('/times-two/:number', (req, res) => {
  res.json(req.params.number * 2);
});

const compliments = [
  'Nice haircut',
  'Excellent haircut',
  'Nice beard',
  'You are the best person I have met today'
];

// using `req.params`
app.get('/nice-things/:index', (req, res) => {
  res.send(compliments[req.params.index]);
});

// start the server
app.listen(3001);
