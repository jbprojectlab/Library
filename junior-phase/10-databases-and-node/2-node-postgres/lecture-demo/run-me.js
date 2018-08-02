const pg = require('pg');

async function doThings () {
  try {
    //                             protocol   domain   port database name
    const client = new pg.Client('postgres://localhost:5432/gony_wedding');
    await client.connect();
    const usersResult = await client.query('SELECT * FROM users');
    console.log(usersResult.rows[5]);
  } catch (error) {
    console.log('There was a problem, yikes!');
    console.log(error.message);
    console.log(error.stack);
  }
}

doThings();
