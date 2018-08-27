const app = require('./app');

const port = 4000;
app.listen(port, err => {
  if (err) console.error(err);
  else console.log(`Listening on port`, port);
});
