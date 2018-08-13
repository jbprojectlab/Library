const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const supertest = require('supertest');

const {db, Hat} = require('../server/db');
const app = require('../server/app');

describe('Hat model', () => {

  before('sync the db with the models', async () => {
    await db.sync({force: true});
  });

  it('requires a name', async () => {
    await expect(Hat.create({})).to.be.rejected;
  });

});

describe('API routes', () => {

  let client;
  before('create a supertest client', async () => {
    client = supertest(app);
    await db.sync({force: true});
  });

  it('GET /api/hats comes back with JSON array', async () => {
    const response = await client.get('/api/hats');
    expect(response.body).to.be.an('array');
  });

  it('GET /api/hats comes back with everything in the database', async () => {
    await Hat.create({name: 'Whacky animal'});
    const response = await client.get('/api/hats');
    expect(response.body).to.have.length(1);
    const thatOneThing = response.body[0];
    expect(thatOneThing).to.have.property('name', 'Whacky animal');
  });

});
