const sleep = (waitTime) => {
  return new Promise((resolve, reject) => {
    // wait for a certain amount of time
    setTimeout(() => {
      // then resolve ...or reject
      resolve();
    }, waitTime);
  });
};

// // an example that uses `reject`
// const fs = require('fs');
// const promisifiedReadFile = (filepath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filepath, (err, contents) => {
//       if (err) reject(err);
//       else resolve(contents);
//     });
//   });
// };
