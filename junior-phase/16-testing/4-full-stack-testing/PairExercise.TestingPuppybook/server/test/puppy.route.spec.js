const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const Puppy = require('../db').models.puppy;

describe('Puppy routes', () => {
  before('Synchronize the model', () => Puppy.sync({ force: true }));
  beforeEach('Truncate data', () => Puppy.truncate());

  describe('GET /api/puppies', () => {
    it('responds with 200 and all puppies in the database', async () => {
      const pupCreations = [
        Puppy.create({ name: 'pup1'}),
        Puppy.create({ name: 'pup2'}),
        Puppy.create({ name: 'pup3'}),
      ];
      await Promise.all(pupCreations);
      await request(app)
        .get('/api/puppies')
        .expect(200)
        .then(response => {
          expect(response.body).to.have.lengthOf(pupCreations.length);
        });
    });
  });

  describe('GET /api/puppies/:id', () => {
    it('responds with 200 and the correct puppy', async () => {
      const buddy = await Puppy.create({
        id: 1,
        name: 'Buddy'
      });
      await request(app)
        .get('/api/puppies/1')
        .expect(200)
        .then(response => {
          expect(response.body.name).to.equal(buddy.name)
        });
    });
  });

  describe('POST /api/puppies', () => {
    it('creates the puppy and responds with 201', async () => {
      await request(app)
        .post('/api/puppies')
        .send({ name: 'Barky' })
        .expect(201);
      const barky = await Puppy.findOne({
        where: { name: 'Barky' },
      });
      expect(barky).to.exist;
    });
  });
});