const express = require('express');
const volleyball = require('volleyball');

const app = express();

app.use(express.json());
app.use(volleyball);
app.use(express.static(__dirname));

const artData = {
  1: {
    id: 1,
    title: 'Did You Ask?',
    imageURL: 'http://fillmurray.com/100/100',
    price: 45000
  },
  2: {
    id: 2,
    title: 'Underneath',
    imageURL: 'http://fillmurray.com/200/200',
    price: 10000
  },
  3: {
    id: 3,
    title: 'Shades of a Window',
    imageURL: 'http://fillmurray.com/300/300',
    price: 88800
  },
  4: {
    id: 4,
    title: 'Me, in Case You Care',
    imageURL: 'http://fillmurray.com/400/400',
    price: 9900
  },
  5: {
    id: 5,
    title: 'Priceless',
    imageURL: 'http://fillmurray.com/500/500',
    price: 0
  }
};

app.get('/api/artwork', (req, res) => {
  res.json(Object.values(artData));
});

app.get('/api/artwork/:artworkId', (req, res) => {
  res.json(artData[req.params.artworkId]);
});

const port = 4000;
app.listen(port, () => {
  console.log('Listen to your heart, or port', port);
});
