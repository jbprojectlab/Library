## Review so far...

### Big O

- Analysis of amount of time / space a function needs
- Abstract estimate (classification) of "upper bound" for an algorithm, not an actual measurement of actual time / space
- Common big O notations (in order "best" to "worst"):
  - constant O(1)
  - logarithmic O(log n)
  - linear O(n)
  - loglinear O(n * log n)
  - quadratic O(n^2)
  - polynomial O(n^2) or O(n^3) or O(n^4)
  - exponential O(2^n) or O(3^n)
  - factorial O(n!)

Only barely important note: there is a difference between "case" and "bound".

- Case: worst case, average case, best case
- Bound: upper bound, tight bound, lower bound

Case is concerned with *special inputs* to the algorithm. Worst case means an input to the algorithm that makes it abrnormally poorly. Average case means an input to the algorithm where it performs normally. Best case means an input to the algorithm that makes it perform abnormally well.

Bound is concerned with the *curve* of the algorithm. Upper bound means that we choose a curve that is **strictly above** the actual curve. Tight bound means that we choose a curve that is **strictly close to** the actual curve. Lower bound means we choose a curve that is **stricltly below** the actual curve.

Example: Omri jumping in the air!

Cases...

- Best case: I'm using a trampoline
- Average case: (nothing special)
- Worst case: I'm holding a medicine ball

Bounds...

- Lower bound: I can jump at least 1 millimeter into the air (technically true)
- Tight bound: I can jump close to 1 foot into the air
- Upper bound: I cannot jump higher than 1000 feet into the air (technically true)

Big O is an upper bound, which is funny. It means for example that you could say "this algorithm is O(n!)" and probably be right.

### Data structures

- Abstract data types (ADT) describe top-level behavior, data structures (DS) describe a concrete in-memory implementation
- Common ones:
  - queue (ADT)
  - stack (ADT)
  - linked list (DS)
  - tree (ADT)
    - trie (ADT)
    - heap (DS)
  - static array (DS)
  - graph (ADT)
  - hash table (DS)
  - map / dictionary / "object" (ADT)

### Optimizations

- Don't do it unless it's a problem
- Figure out what you're optimizing for (generally: time, space, developer time, electricity)
- Think about tradeoffs once you've figured what you're optimizing for
- Common techniques:
  - *Use the right data structure for the job, transform your input if it is not in the shape that is most conducive*
  - Break things down into smaller problems, relates to two things...
  - Solve the problem in a simpler way (outside of the box thinking)
  - Dynamic programming: where you recognize that you are doing repeated work, so instead you cache results or memoize recursive calls
  - For repeated executions, think about caching
  - Pointers and "ratcheting" or binary search (especially for sorted data)
  - Also think about upfront calculations, like sorting it first

### Array into object, object into array, DS to DS (time complexity)

Turning an array into an object (frequent optimization technique):

```js
// O(n) time complexity
const arrToObj = arr => {
  const obj = {};
  for (const elem of arr) {
    obj[elem] = true;
  }
  return obj;
};
// similar...
const arrToSet = arr => {
  const set = new Set();
  for (const elem of arr) {
    set.add(elem);
  }
  return set;
};
```

Turning an object into an array (much less common):

```js
// O(n) time complexity
const objKeysToArr = obj => {
  return Object.keys(obj);
};
const objValuesToArr = obj => {
  return Object.values(obj);
};
const setToArr = set => {
  return Array.from(set);
};
```

In general converting one DS to another is frequently `O(n)` because you usually loop down the input DS (n operations) and adding it to the other DS is usually a constant operation. Sometimes adding each element to the other DS is `O(log n)`—for example converting an object to a binary search tree. So total that can be `O(n * log n)` to convert.
