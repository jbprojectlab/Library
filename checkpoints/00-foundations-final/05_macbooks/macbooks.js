function Laptop (year, hd) {
  this.year = year;
  this.hd = hd;
}

Laptop.prototype.checkSpecs = function () {
  return `Year: ${this.year}, HD: ${this.hd}`;
};

function Macbook (year, hd, color) {
  Laptop.apply(this, [year, hd]);
  this.color = color;
}

function extendWithObjectCreate (toClass, fromClass) {
  toClass.prototype = Object.create(fromClass.prototype);
  toClass.prototype.constructor = toClass;
}

function extendWithNewKeyword (toClass, fromClass) {
  toClass.prototype = new fromClass();
  toClass.prototype.constructor = toClass;
}
