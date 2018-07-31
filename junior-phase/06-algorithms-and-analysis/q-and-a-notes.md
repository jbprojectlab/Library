## bubble sort: loop labeling

*Note: not important for you to know*

Example:

```js
outer: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 20; j++) {
    if (j === 10) {
      continue; // skip over j === 10
    }
    if (j === 15) {
      if (Math.random() > 0.5) {
        break outer; // sometimes leave the outer loop
      }
    }
    console.log('i', i);
    console.log('j', j);
  }
}
```

Allows you to specify `break` or `continue` in a *nested* loop for breaking or continuing an *outer* loop.

Why is this considered not great practice?

1. Uncommon, so it's unexpected, many people don't know about it
2. Lead to complex / awkward (hard to trace) execution flow
3. Stigma, close association to GOTO (see [here](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf))

## "test the behavior, not the implementation"

Testing mantra, philosophy.

- Implementation: how it does it—fine grained details
- Behavior: input and output table

The implementation is "internal" to an algorithm / function. It defines how the function acheives what it intends to acheive.

The behavior is "external" to an algorithm / function. It defines what the function intends to acheive.

When writing unit tests, you *should* care about a function's external behavior. Because that is what everything that uses it will care about.

Testing the implementation can be an issue: the implementation is something that can / should change, and testing the ipmlementation does not really give you any benefits.
