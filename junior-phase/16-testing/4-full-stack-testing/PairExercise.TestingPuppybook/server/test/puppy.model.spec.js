const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Puppy = require('../db').models.puppy;

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('Puppy model', () => {
  // Remember that when we return a promise Mocha handles the async
  // intelligently, so we don't even need to use async/await syntax here!
  before('Synchronize the model', () => Puppy.sync({ force: true }));
  
  // `truncate` removes all data in a table without dropping the entire table
  // and recreating it (which is a bit less expensive than a forced sync)
  beforeEach('Truncate data', () => Puppy.truncate());

  describe('Schema', () => {
    it('requires a "name" string', async () => {
      await expect(Puppy.create()).to.be.rejected;
      await expect(Puppy.create({ name: '' })).to.be.rejected;
      await expect(Puppy.create({ name: [1, 2, 3] })).to.be.rejected;

      // EXAMPLE WITHOUT CHAI-AS-PROMISED:
      // try {
      //   await Puppy.create();
      //   throw new Error('Puppy was created with no name');
      // } catch (err) {
      //   expect(err.name).to.equal('SequelizeValidationError');
      // }
      // etc...
    });
    it('expects "image" field to be a URL string if supplied', async () => {
      const pupper = Puppy.build({ name: 'Pupper' });
      await expect(pupper.save()).to.be.fulfilled; // image url is optional
      pupper.image = ['this array is not a string'];
      await expect(pupper.save()).to.be.rejected;
      pupper.image = 'this string is not a URL';
      await expect(pupper.save()).to.be.rejected;
    });
    it('defaults "DOB" to current date', async () => {
      const doggo = await Puppy.create({ name: 'Doggo' });
      const now = (new Date()).toISOString().slice(0, 10);
      expect(doggo.DOB).to.equal(now);
    });
  });

  describe('Virtuals', () => {
    describe('"age" getter', () => {
      let pupperino;
      beforeEach(() => {
        // `build` a working instance to be manipulated in each spec, such that
        // we don't need to repetitively `create` with the required "name" field
        pupperino = Puppy.build({ name: 'Pupperino' });
      });

      it('calculates correct age based on date of birth', async () => {
        const now = new Date();
        const someTimeAgo = now.setMonth(now.getMonth() - 15);
        pupperino.DOB = someTimeAgo;
        await expect(pupperino.save()).to.eventually.have.property('age', '1yr 3mo');
      });
      it('returns "Unknown" if DOB is unknown', async () => {
        pupperino.DOB = null;
        await expect(pupperino.save()).to.eventually.have.property('age', 'Unknown');
      });
    });
  });
});