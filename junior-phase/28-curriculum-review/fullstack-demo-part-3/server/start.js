const app = require('./app');
const db = require('./db');

const start = async () => {
  await db.sync();
  const port = 5000;
  app.listen(port, error => {
    if (error) console.error(error);
    else console.log(`Server at http://localhost:${port}`);
  });
};

start();
