const Chance = require('chance');
const chance = new Chance();

console.log(chance.sentence({ words: 5 }));
