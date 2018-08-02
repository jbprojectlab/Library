const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

async function readFiles () {
  const fileAContents = await readFilePromise('./file-a.txt', 'utf-8');
  const fileBContents = await readFilePromise('./file-b.txt', 'utf-8');
  console.log('I found file A, it says:', fileAContents);
  console.log('I found file B, it says:', fileBContents);
}
readFiles();
const start = Date.now();
while (Date.now() - start < 2000) {
  // idle for 2 seconds
}
console.log('after readFiles()');
