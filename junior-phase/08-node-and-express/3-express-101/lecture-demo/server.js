const express = require('express');

const app = express();

// start the server and listen on port 4000
app.listen(4000);

// handle a GET request for /
app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// handle a GET request for /about
app.get('/about', (req, res) => {
  res.send('<p>You have arrived at a compl(ie)mentary site!</p>')
});
