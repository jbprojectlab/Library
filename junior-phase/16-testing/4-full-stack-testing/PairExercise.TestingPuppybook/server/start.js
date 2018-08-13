const app = require('./app');
const db = require('./db');

const startApp = async () => {
  try {
    await db.sync();
    app.listen(3000, function () {
      console.log('Server listening on port', 3000);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
