const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

async function readFiles () {
  // await below will cause `readFiles` to "pause"
  // once the promise for the file has resolves, `readFiles` will "play"
  const fileAContents = await readFilePromise('./file-a.txt', 'utf-8');
  // at which point it continues onto line 10
  console.log('I found file A, it says:', fileAContents);
}
readFiles(); // non-blocking
// just because `readFiles` is "paused" does NOT mean that the rest of our JS code is paused—in fact the log on line 14 occurs
console.log('after readFiles()');


/*
Another way to think about what's happening above...

readFiles() goes onto the callstack
  readFilePromise('./file-a.txt', 'utf-8') goes onto the callstack
    COMMUNICATES TO THE FILE READER API TO START A FILE READ
    right NOW returns a promise that will resolve when the file reader api call is complete
  that promise is `await`ed, which "pauses" readFiles() BUT continues past it
console.log('after readFiles()') goes onto the callstack
  COMMUNICATES TO THE TERMINAL TO PRINT TEXT

(now the callstack is empty)

...
in the near future
...

the promise from above resolves, which "unpauses" readFiles() and continues where it left off
console.log('I found file A, it says', fileAContents) goes onto the callstack
  COMMUNICATES TO THE TERMINAL TO PRINT TEXT

(now the callstack is empty)
*/
