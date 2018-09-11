# Big O

## What is it?

- Abstract measurement ("approximation") of how long it takes to run the algorithm changes as the input grows
- Categorization of the growth curve, and can apply to any resource the algorithm need (time, memory, power consumption), but time and space are the most common
- For input that grows arbitrarily large
- "Ish"
- Upper bound (more later)

## What *isn't* it?

- Actual measurement of time / space / whatever; that would be called benchmarking / profiling
- Tight bound (big theta), lower bound (big omega)

## Time complexity

Answers the question: *How much **time** do we need when executing an algorithm, as a function of any inputs to the algorithm that can grow arbritrarily large?*

## How?

When determinining the time complexity of an algorithm, what do you do?

Start by asking: what is happening related to the input? Below it is going through all elements in the array ONCE.

General process:

### "Count the steps" (if not recursive)

An example:

```js
const doubleAll = arr => {
  const result = []; // how many "steps" does this take relative to the input? if the array input gets larger or smaller does this code take any more or less time to operate? NO in this case it is independent so line 28 takes "constant time" (constant regardless of the input changing)
  for (const elem of arr) { // if the array input gets larger or smaller does this for loop have greater or fewer cycles? YES it does, and it grows with the array in "linear time" (as the array gets larger the number of cycles of this loop increases porptionally, at the same rate)
    result.push(elem * 2); // if the array input gets larger or smaller does this code take any more or less time to operate? NO in this case it is independent so line 30 takes constant time
  }
  return result; // also constant time
};
```

Or shortened...

```js
// O(n) it total, where n is the array size
const doubleAll = arr => {
  const result = []; // constant, O(1)
  for (const elem of arr) { // linear, O(n) where n is the array size
    result.push(elem * 2); // constant, O(1)
  }
  return result; // constant, O(1)
};
```

### Multiply steps when nesting loops

An example:

```js
// O(n * n), O(n^2) where n is the array size
const bubbleSort = arr => {
  let sorted = false; // O(1)
  while (!sorted) { // O(1) (best case), O(n) (worst case)
    sorted = true; // O(1)
    for (let idx = 0; idx < arr.length - 1; idx++) { // O(n)
      const curr = arr[idx]; // O(1)
      const next = arr[idx + 1]; // O(1)
      if (curr > next) { // O(1)
        sorted = false; // O(1)
        arr[idx] = next; // O(1)
        arr[idx + 1] = curr; // O(1)
      }
    }
  }
  return arr; // O(1)
};
```

### Drop multiplicitave constants

In big O notation, we don't care about the multiplicative constants, because big O is an approximation / classification, it gives us the shape of the curve not its exact modifiers.

An example:

```js
// would be O(2*n) where n is the array size
// BUT WE DROP THE 2
// O(n)
const findMinAndMax = arr => {
  let min = Infinity; // O(1)
  for (const elem of arr) { // O(n)
    if (elem < min) { // O(1)
      min = elem; // O(1)
    }
  }
  let max = -Infinity; // O(1)
  for (const elem of arr) { // O(n)
    if (elem > max) { // O(1)
      max = elem; // O(1)
    }
  }
  return {min, max}; // O(1)
};
```

Another way to write that algorithm that is entirely equivalent in terms of how much time it would tike:

```js
// O(n) where n is the array size
const findMinAndMax = arr => {
  let min = Infinity; // O(1)
  let max = -Infinity; // O(1)
  for (const elem of arr) { // O(n)
    if (elem < min) { // O(1)
      min = elem; // O(1)
    }
    if (elem > max) { // O(1)
      max = elem; // O(1)
    }
  }
  return {min, max}; // O(1)
};
```

### Don't confuse independent terms

An example:

```js
// O(x * y) where x is the size of arrA and y is the size of arrB
const intersection = (arrA, arrB) => {
  const intersected = []; // O(1)
  for (const elemA of arrA) { // O(x)
    for (const elemB of arrB) { // O(y)
      if (elemA === elemB) { // O(1)
        intersected.push(elemA); // O(1)
      }
    }
  }
  return intersected; // O(1)
};
```

Note that the size of `arrA` and `arrB` are independent of each other

### You can pick your `n`

Same example from above:

```js
// O(n^2) where n is the size of the larger array
const intersection = (arrA, arrB) => {
  const intersected = []; // O(1)
  for (const elemA of arrA) { // O(n)
    for (const elemB of arrB) { // O(n)
      if (elemA === elemB) { // O(1)
        intersected.push(elemA); // O(1)
      }
    }
  }
  return intersected; // O(1)
};
```

This simplification is valid, but we have to do it intentionally.

This is esepecially useful for "weirdly shaped" data. You can choose your `n` very directly.

An example:

```js
// O(n) where n is the number of elements ANYWHERE inside the array
const multiDimSum = arr => {
  let sum = 0;
  for (const elem of arr) {
    if (Array.isArray(elem)) {
      sum += multiDimSum(elem);
    } else {
      sum += elem;
    }
  }
  return sum;
};
```

Especially useful for certain data structures: graphs, trees.

### For recursive algorithms, figure out the size of call the tree

An example:

```js
const nthFibNumber = n => {
  if (n === 0) return 0; // O(1)
  else if (n === 1) return 1; // O(1)
  return nthFibNumber(n - 1) + nthFibNumber(n - 2); // O(???)
};
```

Confounds our attempt to "count the steps" because we need to know the big O of the algorithm to know the big O of the algorithm.

Instead: diagram out the call tree and reason about its size.

The call tree for `4`...

```
/*
               ___f(4)___
              /          \
            f(3)        f(2)
           /    \      /   \
         f(2)  f(1)  f(1) f(0)
        /   \
      f(1) f(0)
*/
```

The size of a tree *number of branches* (e.g. 2) to the power of *height of the tree* (e.g. 4).

So in this case the size of the tree is 2^n where n is the input number. And that means the time complexity is O(2^n).

## Space complexity

Answers the question: *How much **extra memory** do we need when executing an algorithm, as a function of any inputs to the algorithm that can grow arbritrarily large?*

How do we calculate it? "Count" the space, and will involve counting steps. We do not (ordinarily) include the size of the inputs. Only the "extra" space needed, the maximum extra space needed for the entire algorithm's execution.

An example:

```js
// O(x + y) added space where x is the size of arrA and y is the size of arrB
const concatenate = (arrA, arrB) => {
  const merged = []; // adds O(1) space
  // all together this loop increases our space by O(x)
  for (const elem of arrA) { // will cycle O(x) times
    merged.push(elem); // adds O(1) space
  }
  // all together this loop increases our space by O(y)
  for (const elem of arrB) { // will cycle O(y) times
    merged.push(elem); // adds O(1) space
  }
  return merged; // O(1) space
};
```

Space complexity for recursive algorithms tends to be based off of the height of the call tree (not its entire size). Because that tells us the maximum size of the call stack for this algorithm.

## Common big O categories

### Sublinear

- O(1): constant
- O(log n): logarithmic

### Linear

- O(n): linear
- O(n * log n): loglinear (does this belong here? not sure?)

### Polynomial

- O(n^2): quadtratic
- O(n^3): cubic
- O(n^4): quartic
- O(n^k): where k is some constant

### Non-polynomial

- O(2^n): exponential
- O(n!): factorial

There are an infinite number of big O equations.
