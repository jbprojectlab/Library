// using `for..in`
function keyAdder () {
  let total = 0;
  for (let key in this) {
    if (this.hasOwnProperty(key)) {
      const value = this[key];
      if (typeof value === 'number') {
        total += value;
      }
    }
  }
  return total;
}

// // using `Object.keys` and `.forEach` with a "self" closure
// function keyAdder () {
//   let total = 0;
//   const self = this;
//   Object.keys(this).forEach(function (key) {
//     if (self.hasOwnProperty(key)) {
//       const value = self[key];
//       if (typeof value === 'number') {
//         total += value;
//       }
//     }
//   });
//   return total;
// }

// // using `Object.keys` and `.forEach` with an arrow function
// function keyAdder () {
//   let total = 0;
//   Object.keys(this).forEach(key => {
//     if (this.hasOwnProperty(key)) {
//       const value = this[key];
//       if (typeof value === 'number') {
//         total += value;
//       }
//     }
//   });
//   return total;
// }

// // using `Object.keys` and `for..of`
// function keyAdder () {
//   let total = 0;
//   for (let key of Object.keys(this)) {
//     if (this.hasOwnProperty(key)) {
//       const value = this[key];
//       if (typeof value === 'number') {
//         total += value;
//       }
//     }
//   }
//   return total;
// }

// // using function programming techniques
// function keyAdder () {
//   return Object.keys(this)
//   .map(key => this[key])
//   .filter(value => typeof value === 'number')
//   .reduce((total, num) => total + num, 0);
// }
