const sinon = require('sinon');
const { expect } = require('chai');

const coinFlip = () => {
  if (Math.random() > 0.5) return 'heads';
  else return 'tails';
};

describe('coinFlip', () => {
  let stub = sinon.stub(Math, 'random');
  afterEach(() => stub.reset());

  it('returns "heads" if Math.random > 0.5', () => {
    stub.returns(0.8);
    expect(coinFlip()).to.equal('heads');
  });
  it('returns "tails" if Math.random <= 0.5 ', () => {
    stub.returns(0.2);
    expect(coinFlip()).to.equal('tails');
  });
});
