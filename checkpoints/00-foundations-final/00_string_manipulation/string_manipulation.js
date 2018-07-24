// oooh fancy, `for..of`
function vowelsCount (str) {
  let count = 0;
  for (let ch of str) {
    if ('aeiou'.includes(ch.toLowerCase())) {
      count++;
    }
  }
  return count;
}

// // using a regex
// const vowelPattern = /[aeiou]/ig;
// function vowelsCount (str) {
//   const matches = str.match(vowelPattern);
//   return matches ? matches.length : 0;
// }

// // using a set
// const vowels = new Set('AEIOUaeiou');
// function vowelsCount (str) {
//   let count = 0;
//   for (let ch of str) {
//     if (vowels.has(ch)) count++;
//   }
//   return count;
// }
