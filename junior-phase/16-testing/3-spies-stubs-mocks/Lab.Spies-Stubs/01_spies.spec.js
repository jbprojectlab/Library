const sinon = require('sinon');
const { expect } = require('chai');

const alternate = (callback) => {
  let justCalled = false;
  return () => {
    if (!justCalled) {
      justCalled = true;
      return callback();
    }
    justCalled = false;
  };
};

describe('alternate', () => {
  let spy = sinon.spy();
  it('returns a function', () => {
    expect(alternate(spy)).to.be.a('function');
  });
  it('alternating function invokes callback every other time', () => {
    const alternating = alternate(spy);
    alternating();
    expect(spy.callCount).to.equal(1);
    alternating();
    expect(spy.callCount).to.equal(1);
    alternating();
    expect(spy.callCount).to.equal(2);
  });
});
