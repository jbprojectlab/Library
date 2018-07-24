function interleave () {
  const strs = Array.prototype.slice.call(arguments);
  let maxLength = 0;
  strs.forEach(function (str) {
    maxLength = Math.max(maxLength, str.length);
  });
  let interleaved = '';
  for (let i = 0; i < maxLength; i++) {
    strs.forEach(function (str) {
      if (str[i] !== undefined) {
        interleaved += str[i];
      }
    });
  }
  return interleaved;
}

// // using `.reduce` to get the max length
// function interleave () {
//   const strs = Array.prototype.slice.call(arguments);
//   const maxLength = strs.reduce(function (currentMax, str) {
//     return Math.max(currentMax, str.length);
//   }, 0);
//   let interleaved = '';
//   for (let i = 0; i < maxLength; i++) {
//     strs.forEach(function (str) {
//       if (str[i] !== undefined) {
//         interleaved += str[i];
//       }
//     });
//   }
//   return interleaved;
// }

// // using neat tricks like the `...` (rest) operator, `for..of`, and `.charAt`
// function interleave (...strs) {
//   const maxLength = strs.reduce(function (currentMax, str) {
//     return Math.max(currentMax, str.length);
//   }, 0);
//   let interleaved = '';
//   for (let i = 0; i < maxLength; i++) {
//     for (const str of strs) {
//       interleaved += str.charAt(i);
//     }
//   }
//   return interleaved;
// }
