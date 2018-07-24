function alternate (originalFn) {
  let count = 0;
  return function () {
    const args = Array.prototype.slice.call(arguments);
    count = (count + 1) % 2;
    if (count === 1) {
      return originalFn.apply(this, args);
    }
  };
}

function twice (originalFn) {
  let count = 0;
  return function () {
    const args = Array.prototype.slice.call(arguments);
    count++;
    if (count <= 2) {
      return originalFn.apply(this, args);
    } else {
      return 0;
    }
  };
}

// // with `...` (rest) operator instead of `arguments` keyword
// function alternate (originalFn) {
//   let count = 0;
//   return function (...args) {
//     count = (count + 1) % 2;
//     if (count === 1) {
//       return originalFn.apply(this, args);
//     }
//   };
// }

// // with `...` (rest) operator instead of `arguments` keyword
// function twice (originalFn) {
//   let count = 0;
//   return function (...args) {
//     count++;
//     if (count <= 2) {
//       return originalFn.apply(this, args);
//     } else {
//       return 0;
//     }
//   };
// }
