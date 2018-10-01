# Numbers

Things that you probably know:

- `+`, e.g. `2 + 2 === 4`
- `-`, e.g. `5 - 3 === 2`
- `*`, e.g. `8 * 9 === 72`
- `/`, e.g. `10 / 2 === 5`

Things that you have probably used:

- `Math.floor`, e.g. `Math.floor(1.9) === 1`
- `Math.ceil`, e.g. `Math.ceil(12.2) === 13`
- `Math.random`, e.g. `Math.random() // something between 0 and 1`

Things you might not be familiar with:

- `%` (modulo), e.g. `50 % 7 === 1`
- `&` (bitwise and), e.g. `5 & 9 === 1`
- `|` (bitwise or), e.g. `5 | 9 === 13`
- `^` (bitwise xor), e.g. `5 ^ 9 === 12`
- `~` (bitwise not), e.g. `~5 === -6`
- `>>` (bit shift right), e.g. `5 >> 1 === 2`
- `<<` (bit shift left), e.g. `5 << 1 === 10`

## Why care?

- Can help optimize (not usually change the big O, but will often help speed them up in constant ways)
- Certain calculations require it
- Computers represent values in binary (always), so understanding bitwise operators helps you understand more low-level behavior
- Once you're familiar with these tools, it can help simplify certain problems
- Certain high-throughtput (heavy data) operations will only be possible (in a reasonably performant manner) by using bitwise / low-level operations: audio / video data manipulation
- It can come up in interviews

## `%` (modulus)

This calculate the remainder after dividing. Especially useful for "cyclic" operations.

Exercise: get the last digit after multiplying a sequence of positive integers together.

```js
lastDigitAfterMultiplying([2,4,5]); // => 0
lastDigitAfterMultiplying([2,2,2,2,2,2,2,2,2,2]); // => 4
lastDigitAfterMultiplying([7,9,6,6,7,5,2]); // => 0
lastDigitAfterMultiplying([567, 143, 88, 192, 3333356, 9, 801029]); // => 6
```

The core issue is that you cannot multiply large numbers in JS (and other languages) and retain information about their last digit.

Approach: get the last digit of each number and multiply those!

```js
const lastDigitAfterMultiplying = nums => {
  let result = 1;
  for (const num of nums) {
    result = ((num % 10) * result) % 10;
  }
  return result;
};
```

## Bases, binary

- A number is a sequence of digits
- A "base" represents how big each individual digit can get
- Computers use binary (base two), so two is the new ten! As in, if we have `10` in binary that is actually equal to "two"
- Like counting with two fingers only
- Why do computers use binary? Becuase data is always stored as ON or OFF so 1 or 0, i.e. binary. In turn this is because it's easier to be COMPLETELY PRECISE but only keep something in two different states (as opposed to three or more)
- In JS numbers are "actually" in binary, they don't look like it, but they are—we write in decimal, but the actual value is stored in a binary reprsentation

Let me prove it by using a bitwise operator...

## `&` (bitwise and)

The `&` operator given two single bits ("are they both on"):

```js
0 & 0 === 0
0 & 1 === 0
1 & 0 === 0
1 & 1 === 1
```

But the `&` operator can be used on any number, not just 0 and 1.

```js
5 & 9 === 1
```

WHY? WHAT? When we do an `&` it does the bitwise operation on each pair of correspdonding bits (binary digits) in both numbers.

In binary this looks like:

```
  0101
& 1001
------
  0001
```

## `|` (bitwise or)

The `|` operator given two single bits ("either or both"):

```js
0 | 0 === 0
0 | 1 === 1
1 | 0 === 1
1 | 1 === 1
```

But just like before, the `|` operator can be used on any number, not just 0 and 1.

```js
5 | 9 === 13
```

When we do an `|` it does the bitwise operation on each pair of correspdonding bits (binary digits) in both numbers.

In binary this looks like:

```
  0101
| 1001
------
  1101
```

## `^` (bitwise xor)

The `^` operator given two single bits ("either or, but not both"):

```js
0 ^ 0 === 0
0 ^ 1 === 1
1 ^ 0 === 1
1 ^ 1 === 0
```

Which means that:

```js
5 ^ 9 === 12;
```

Because in binary this looks like:

```
  0101
^ 1001
------
  1100
```

## `~` (bitwise not)

The `~` operator given one bit ("invert it"):

```js
~0 === 1
~1 === 0
```

WARNGING: ABOVE IS TECHNICALLY INCORRECT.

Which means that:

```js
~5 === 2;
```

Because in binary this looks like:

```
~101
----
 010
```

BUT NO!

...but actually in binary `5` looks like:

```
~000000000000000000000000000000000000000000000000000000000000101
----------------------------------------------------------------
 111111111111111111111111111111111111111111111111111111111111010
```

Which is *not* two. In fact that equals negative 6. The leftmost bit in a binary digit (in computers) usually represents the "sign" (positive is 0, negative is 1). Also when negative numbers are reprented they are often reprented using "twos complement" where the value at hand is actually THE MAXIMUM VALUE minus the DISPLAYED BINARY NUMBER.

Negative numbers are represented in a non-intuitive way.

## `>>` (bit shift right)

This takes the binary representation and moves all the digits right by a certain amount:

```js
5 >> 1 === 2;
```

In binary:

```
101 >> 1
 10 ..1

|1|0|1|
  \ \ \
   | | |
|0|1|0|
```

Another example:

```js
92 >> 2 === 23
```

In binary:

```
1011100 >> 2
  10111 ..00
```

Bit shifting right divides by two and rounds down.

## `<<` (bit shift left)

This takes the binary representation and moves all the digits left by a certain amount:

```js
5 << 1 === 10
```

In binary:

```
0101 << 1
1010
```

Another example:

```js
92 << 2 === 184
```

```
001011100 << 2
101110000
```

Bit shifting left multiplies by two. Why? This is like in decimal if we were to shift a decimal number to the left by one spot that's the same as multiplying by ten: `3567 * 10 === 35670`. In binary our base is two, but other than that this works the same way.

## Bitwise math example problem

Exercise: get the nth bit of a number (counting bits from right to left).

```js
getNthBit(871, 4); // => 0
// 871 in binary...
//      43210
//      v
// 1101100111
getNthBit(871, 2); // => 1
// 871 in binary...
//        210
//        v
// 1101100111
const getNthBit = (num, bitIdx) => {
  return (num >> bitIdx) & 1;
};
// 871 in binary...
//      43210
//      v
// 1101100111
// shift right by 4
// 1101100111 >> 4
//     110110
// determine the value of the last bit now by ANDing with 1
//     110110
//   & 000001
//     ------
//     000000
```
