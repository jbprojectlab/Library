// console.log('in file b', __filename);

const thing = require('./file-a.js');
console.log('name is', thing.name);
console.log(thing.fact + '!');

const someFn = require('./file-c.js');
console.log(someFn(0));
