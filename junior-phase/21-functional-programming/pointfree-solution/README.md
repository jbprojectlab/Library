# PointFree

An exercise in partially applying and composing curried functions.

```sh
npm i
npm t # or npm run test-watch, for watch mode
```

## Rules

Work in `/src/pointfree.js` to pass the specs in `src/pointfree.spec.js`.

For this exercise:

- Do NOT define new functions manually, from scratch.
  - No `function` keyword
  - No `=>` definition
  - No `new Function` constructor
  - No `eval(...)` trickery
- Instead, use existing functions (from `./src/functions`)
  - Compose functions together using `pipe` and/or `curry` (imported for you)
  - Partially apply functions (all provided functions are already curried, and all functions you derive from them will automatically be curried as well)
  - You _may_ use derived functions to derive even more functions

## What's the Point?

The "point" in "point-free" does **not** refer to the `.` character.

From topology, functions are sometimes said to map "points" from one space into "points" of another space. For example, the function `integer => integer * 2` maps from the integer "points" (as input) to the even integer "points" (as output).

"Point-free" programming, aka "tacit" programming, is a style in which the points of a function are not explicitly shown – that is, the **parameters** are not named. Point-free functions are defined via composition.

```js
const yellHalf1 = num => yell(half(num)) // point-ful (explicit param `num`)
const yellHalf2 = compose(yell, half) // point-free (no params in sight!)
```

Both of the above functions are equivalent; they perform the same task. The first explicitly names the `num` it operates on; the second does not. The first shows what the function _does_ (halves a number and then yells the result); the second shows what the function _is_ (the composition of `yell` and `half`).

### Why Point-Free?

_Sometimes_, point-free style is cleaner, with fewer nested expressions and no need to introduce a parameter name. Point-free is slightly more declarative. This is especially true in functional languages with terse syntax for function application and composition; in JavaScript, the benefit is lessened a bit. Compare:

```js
// JavaScript
const getShortNames1 = map(compose(shorten, toName)) // point-free
const getShortNames2 = people => people.map(person => shorten(toName(person))) // point-ful
```

```hs
-- Haskell
getShortNames1 = map (shorten . toName) -- point-free
getShortNames2 people = map (\person -> shorten (toName person)) people -- point-ful
```

That being said, it is easy to go overboard. To do FP well does _not_ mean to write everything in point-free style; point-free is just one tool that can, judiciously applied, clean up _some_ expressions. This exercise enforces writing everything in point-free style only as a form of practice, not as a model to follow. When in doubt, follow [Amar Shah's Rules](https://www.youtube.com/watch?v=seVSlKazsNk):

#### Amar Shah's Rules

- **Use** point-free style **when** it communicates better.
- **Avoid** point-free style **when** it doesn't.

## Notes & Resources

- Partly inspired by [Thinking in Ramda](http://randycoulman.com/blog/2016/05/31/thinking-in-ramda-combining-functions/) by Randy Coulman
