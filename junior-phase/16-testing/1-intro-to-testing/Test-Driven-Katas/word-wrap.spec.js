const { expect } = require('chai');
const wordWrap = require('./word-wrap');

describe('wordWrap', () => {

  it('returns empty string if empty string was provided', () => {
    expect(wordWrap('', 10)).to.equal('');
  });

  it('returns the whole input string if the max length is greater', () => {
    expect(wordWrap('this is some text', 18)).to.equal('this is some text');
  });

  it('will insert newlines after each word, given words of the same size as max length', () => {
    expect(wordWrap('four five nine will wall fill fall', 4)).to.equal('four\nfive\nnine\nwill\nwall\nfill\nfall');
  });

  it('will insert a newline at the nearest word boundary', () => {
    expect(wordWrap('Lorem ipsum dolor sit eu amet, elit na magna', 20)).to.equal('Lorem ipsum dolor\nsit eu amet, elit na\nmagna');
  })

});
