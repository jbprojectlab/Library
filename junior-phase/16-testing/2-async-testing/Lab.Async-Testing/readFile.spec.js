const fs = require('fs');
const { expect } = require('chai');
const promisifiedReadFile = require('./promisifiedReadFile');

describe('Async tests', () => {
  const testContent = 'Hello! This is a test file';

  before('create test file', (done) => {
    fs.writeFile('test.txt', testContent, done);
  });

  it('fs.readFile with done callback',  (done) => {
    fs.readFile('test.txt',  (err, data) => {
      if (err) return done(err);
      expect(data.toString()).to.equal(testContent);
      done();
    });
  });

  it('promisifiedReadFile with promises', () => {
    return promisifiedReadFile('test.txt')
    .then(data => {
      expect(data.toString()).to.equal(testContent);
    });
  });

  it('promisifiedReadFile with async await', async () => {
    const data = await promisifiedReadFile('test.txt');
    expect(data.toString()).to.equal(testContent);
  });
});
