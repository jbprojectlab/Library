const { db } = require('./db');
const app = require('./app');

(async () => {
  await db.sync();
  app.listen(3000, () => console.log('listening on port 3000'));
})();
