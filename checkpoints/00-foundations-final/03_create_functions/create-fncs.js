function createFunctions (size) {
  const fns = [];
  for (var i = 0; i < size; i++) {
    (function (n) {
      fns.push(function () {
        return n;
      });
    })(i);
  }
  return fns;
}

// // using `let`
// function createFunctions (size) {
//   const fns = [];
//   for (let i = 0; i < size; i++) {
//     fns.push(function () {
//       return i;
//     });
//   }
//   return fns;
// }
