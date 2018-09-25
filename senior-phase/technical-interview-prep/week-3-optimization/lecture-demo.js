/*
Write a function which takes in a number and a sorted array of numbers. Return true if any 2 numbers could add up to the number passed in. 
*/

hasPairSum(16, [1, 5, 6, 8, 9, 14]); // false
hasPairSum(1000, [1, 5, 6, 8, 9, 14]); // false
hasPairSum(13, [1, 5, 6, 8, 9, 14]); // true
hasPairSum(23, [1, 5, 6, 8, 9, 14]); // true

// naive approach...
// O(n^2) time compexity
const hasPairSum = (target, nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return true;
    }
  }
  return false;
};

// ratcheting approach...
// O(n) time complexity
const hasPairSum = (target, nums) => {
  let leftIdx = 0;
  let rightIdx = nums.length - 1;
  while (leftIdx !== rightIdx) {
    const sum = nums[leftIdx] + nums[rightIdx];
    if (sum === target) return true;
    else if (sum > target) {
      rightIdx--;
    } else if (sum < target) {
      leftIdx++;
    }
  }
  return false;
};

// slow subsearch (includes) approach...
// O(n^2) time complexity
const hasPairSum = (target, nums) => {
  for (const elem of nums) {
    if (nums.includes(target - elem)) {
      return true;
    }
  }
  return false;
};

// fast subsearch (object) approach...
// O(n) time complexity
const hasPairSum = (target, nums) => {
  const objLookup = {};
  for (const elem of nums) {
    objLookup[elem] = true;
  }
  for (const elem of nums) {
    if (objLookup[target - elem]) {
      return true;
    }
  }
  return false;
};

// fast subsearch (set) approach...
// O(n) time complexity
const hasPairSum = (target, nums) => {
  const setLookup = new Set();
  for (const elem of nums) {
    setLookup.add(elem);
  }
  for (const elem of nums) {
    if (setLookup.has(target - elem)) {
      return true;
    }
  }
  return false;
};

//--------------

/*
Find the nth fibonacci number
*/

fibo(0); // 0
fibo(1); // 1
fibo(2); // 1
fibo(3); // 2
fibo(4); // 3
fibo(5); // 5
fibo(6); // 8
fibo(7); // 13
fibo(8); // 21

// naive recursive approach...
// O(2 ^ n) time complexity, exponential
const fibo = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibo(n - 1) + fibo(n - 2);
};

/* our call tree...
fibo(6)
  fibo(5)
    fibo(4)
      fibo(3)
        fibo(2)
          fibo(1)
          fibo(0)
        fibo(1)
      fibo(2)
        fibo(1)
        fibo(0)
    fibo(3)
      fibo(2)
        fibo(1)
        fibo(0)
      fib(1)
  fibo(4)
    fibo(3)
      fibo(2)
        fibo(1)
        fibo(0)
      fibo(1)
    fibo(2)
      fibo(1)
      fibo(0)

The time complexity will be the size of the tree; so how does the input determine the tree size?

A tree's size is (number of children per node) to the power of (number of levels), here that's (2) to the power of (our input).
*/

/*
To optimize we can recognize OVERLAPPING SUBPROBLEMS. In the recursive approach we can capture the result of these overlapping subproblems the FIRST time we see one and then access it quickly for the later times: memoization

Overlapping subproblems (recursion): 1) recursive calls; 2) some of those (many of those) recursive calls are repeated / redundant.
*/

// O(n) time complexity
const memoizedFibo = (n, memo = {}) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];
  const result = memoizedFibo(n - 1, memo) + memoizedFibo(n - 2, memo);
  memo[n] = result;
  return result;
};

/*
Now to figure out time copmlexity reason about how the call tree has changed!

fibo(6)
  fibo(5)
    fibo(4)
      fibo(3)
        fibo(2)
          fibo(1)
          fibo(0)
        fibo(1)
      fibo(2)
    fibo(3)
  fibo(4)
*/

/*
Given a target sum and a an array of coin DENOMINATIONS return the minimum number of coins needed to add to the target sum.
*/

coinChange(40, [1,5,10,25]); // 3
coinChange(101, [1,5,10,25]); // 5
coinChange(6, [1,3,4]); // 2
coinChange(13, [3,4,6]); // 3
coinChange(0, [3,4,6]); // 0

/*
One approach: try all possible combinations of coins and return the minimum number
*/

// O(n ^ x) where n is denoms size, x is the target number, exponential
const coinChange = (target, denoms) => {
  if (target === 0) return 0;
  let globalMin = Infinity;
  // for each coin
  for (const coin of denoms) {
    // make a smaller target with that coin
    const subtarget = target - coin;
    // if the subtarget is negative it is not a possibility
    if (subtarget < 0) continue;
    // otherwise try that subtarget with the same denoms
    const possibleMin = 1 + coinChange(subtarget, denoms);
    // update the global minimum based on whether the possible minimum is smaller
    globalMin = Math.min(globalMin, possibleMin);
  }
  return globalMin;
};

/*
To figure out the time complexity, diagram the call tree...

Choose an example: `coinChange(13, [3,4,6])`

coinChange(13)
  coinChange(7)
    coinChange(1)
    coinChange(3)
      coinChange(0)
    coinChange(4)
      coinChange(0)
      coinChange(1)
  coinChange(9)
    coinChange(3)
      coinChange(0)
    coinChange(5)
      coinChange(1)
      coinChange(2)
    coinChange(6)
      coinChange(0)
      coinChange(2)
      coinChange(3)
        coinChange(0)
  coinChange(10)
    coinChange(4)
      coinChange(0)
      coinChange(1)
    coinChange(6)
      coinChange(0)
      coinChange(2)
      coinChange(3)
        coinChange(0)
    coinChange(7)
      coinChange(1)
      coinChange(3)
        coinChange(0)
      coinChange(4)
        coinChange(0)
        coinChange(1)

What is the size of this tree? (number of children per node) to the power of (height of the tree) so (number of denominations) to the power of (target number)
*/
