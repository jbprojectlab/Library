const { expect } = require('chai');
const twoSum = require('./two-sum');

describe('twoSum', () => {

  describe('returns an empty array if', () => {

    it('receives an empty array', () => {
      expect(twoSum([], 10)).to.deep.equal([]);
    });

    it('cannot find the target sum from any two elements', () => {
      expect(twoSum([ 20, 21, 3, 2, 3, 6, 28, 47 ], 11)).to.deep.equal([]);
    });

    it('cannot find the target sum from any two *distinct* elements', () => {
      expect(twoSum([ 4, 3, 5, 2, 1 ], 10)).to.deep.equal([]);
    });

  });

  describe('returns a valid combination if pair exists', () => {

    it('works on a small array', () => {
      expect(twoSum([ 5, 4, 11, 8 ], 12)).to.deep.equal([ 1, 3 ]);
    });

    it('works on a larger array', () => {
      expect(twoSum([ 41, 1, 11, 18, 20, 3, 41, 7, 21, 19, 48, 22, 36 ], 33)).to.deep.equal([ 2, 11 ]);
    });

    it('works if duplicated values sum to target', () => {
      expect(twoSum([ 3, 3 ], 6)).to.deep.equal([ 0, 1 ]);
    });

    it('works if more than one pair exists', () => {
      const numbers = [ 2, 4, 6, 8 ];
      const target = 10;
      const [ idx1, idx2 ] = twoSum(numbers, target);
      expect(numbers[idx1] + numbers[idx2]).to.equal(target);
    });

  });

});
