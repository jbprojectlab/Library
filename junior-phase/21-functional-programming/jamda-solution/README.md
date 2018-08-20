# 🍓 Jamda

### Jamming Functions Together

A small lab to practice implementing functions in an FP style.

```sh
npm i
npm t
```

## Exercise

1. Check out the way all the `f._____` functions are being used in index.js.
1. Note that using Ramda as `f`, index.js works properly (1st test passes).
1. Implement the helper functions in `01-jamda.js` to make their tests pass.
1. Now the second index spec, using Jamda, should also pass.

This lab demonstrates:

* Using lots of functions
* Small, single-purpose functions
* Pure functions (same data in = same result out, no effects)
* Function composition (gluing functions together)
* Higher-order functions

### Bonus 1 (Reasonable Effort)

Try to implement the helpers using as many FP techniques as you can. For example, try not to use any `var` or `let` – only `const` declarations. Likewise, avoid changing any object properties after instantiation. This will likely prove challenging in a couple spots, so it is okay if you cannot wholly avoid it.

### Bonus 2 (Hard Challenge)

Replace the use of `curry` in `jamda.js` with your own implementation, capable of replicating the behavior [described in the docs](http://ramdajs.com/docs/#curry).

## Additional Resources

* Jamda is based on the JS FP library [Ramda](http://ramdajs.com/).
* Check out [Thinking in Ramda](http://randycoulman.com/blog/2016/05/24/thinking-in-ramda-getting-started/) for a good guide to not only Ramda, but FP concepts in general.
