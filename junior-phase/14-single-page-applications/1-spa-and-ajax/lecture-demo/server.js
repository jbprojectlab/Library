const express = require('express');
const volleyball = require('volleyball');

const app = express();

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file serving routes
app.use(express.static(__dirname));

const countersData = {
  Omri: 0,
  Jack: 0
};

// "data route" / "API route"
app.get('/counters', (req, res) => {
  res.send(countersData);
});
app.put('/counters/:person', (req, res) => {
  if (Math.random() > 0.5) {
    countersData[req.params.person]++;
  }
  res.send({updatedNumber: countersData[req.params.person]});
});

app.listen(4000, () => {
  console.log('Server is started');
});
