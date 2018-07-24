## taking values and reporting size

By default, our instance's `this.magnitude` is `1`. Every `.insert` we increase `this.magnitude` by `1`. For the `.size` method we `return this.magnitude`.

## depth first search

How does it "go back up"? The call stack.

```js
class BinarySearchTree {
  // ...
  depthFirstForEach (fn, opt = 'in-order') {
    if (opt === 'pre-order') fn(this.value);
    if (this.left) this.left.depthFirstForEach(fn, opt);
    if (opt === 'in-order') fn(this.value);
    if (this.right) this.right.depthFirstForEach(fn, opt);
    if (opt === 'post-order') fn(this.value);
  }
  // ...
}
```

Let's do an example using the bst.png.

```js
example.depthFirstForEach(function (value) {
  console.log(value);
});
// visualize / diagram the callstack
```
