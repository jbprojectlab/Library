# Data structures

## Why do we care?

- The form / shape of the data can help us quickly figure out the time complexity for common operations on it
- Optimization: choosing the right data structure can help your algorithm run quickly
- Choosing the right data model / representation helps clarify code and keep it more maintainable
- Other people care, and sometimes those people interview you

## What is important to understand about data structure?

- Know common ones
- Knowing the common operations on each of those data structures
- Knowing how / when to use one
- MUCH less important: being able to build any / all of them from scratch

## ADT vs. DS

Abstract data type vs. data structure

*Data structure*: description of how something is physically stored

*Abstract data type*: description of what methods (behavior) something has; needs a data structure "behind" it in order to work

## Array

Confusing terminology. In JS we have this `Array` class which is not considered (by many) to be a "true array". A "true array" is something more like in C, where the elements are all the same size in memory and are all laid out contiguously. Furthermore the array has a fixed size that it is allocated.

We do lately have the ability to define these "true arrays" in JS: `TypedArray`.

Metaphor: cubbies.

This is a *data structure*.

Common operations:

- Loop over every element, O(n)
- Append, O(1) (as long as you ALSO have a pointer to the last element)
- Insertion at index, O(n)
- Set / replace by index, O(1)
- Access by index, O(1)

## Linked list (singly- and doubly-linked)

Composed of nodes where each node has a value and a pointer to the next node (singly-linked list). Composed of nodes where each node has a value and a pointer to the previous node AND a pointer to the next node (doubly-linked list). The linked list itself has a head pointer to the first node (and sometimes a tail pointer to the last node).

Metaphor: scavenger hunt.

This is a *data structure*.

Common operations:

- Loop over every element, O(n)
- Add (to front or back), O(1)
- Inerstion at index, O(n)
- Remove, O(1)
- Remove at index, O(n)
- Set / replace at index, O(n)
- Access by index, O(n)
- Insert before or after a node, O(1)

## Queue

Collection of elements and is FIFO (first in first out).

Metaphor: people waiting in a line.

This is an *abstract data type*. Could be backed by an array or a linked list.

Common operations:

- Enqueue, O(1) ideally
- Dequeue, O(1) ideally

## Stack

Collection of elements and is LIFO (last in first out).

Metaphor: pancakes.

This is an *abstract data type*. Could be backed by an array or a linked list.

Common operations:

- Push, O(1) ideally
- Pop, O(1) ideally

## Hashmap / hashtable

Is backed by an array (static, the data structure). It is a way to store any value for any dynamic string-based key. You take the key, you run it through a "hashing function" which produces an index. You store the value at that index in the array. When you want to retrieve the value for a key, you run that prospective key through the same hashing function which produces an index, you look up that index in the array.

**Kind of** like an object. But not really an object.

This is a *data structure*.

Common operations:

- Set a key, O(1)
- Get a key, O(1)

## Associative array / dictionary / map

A collection where you can look for (or set) a value by key (instead of e.g. index). THIS is much more like an `Object` in JS.

This is an *abstract data type*. Can be backed by a hash table, but also could be backed by a tree.

Common operations:

- Set a key, O(1) or O(log n)
- Get a key, O(1) or O(log n)

## Tree

Node with pointers to its children (which are also trees).

This is a *data structure*.

Common operations:

- Insert new child given parent, O(1)
- Search for value, O(n) unsorted trees
- Remove a value, O(n) unsorted trees

### Binary tree

Just a tree where any node can have AT MOST two children ("left" and "right").

### Binary search tree

Is a binary tree where the children are ordered according to some criteria. For example, we might say that the left child is always less than the node's value and the right child is always greater than (or equal to) the node's value.

A naive binary search tree can easily become "imbalanced": one branch is heavier than the other, has many more leaves. On the other hand, BSTs are relatively easier to implement (e.g. than self-balancing trees).

Common operations:

- Insertion, O(log n)
- Search for a value, O(log n)
- Remove a value, O(log n)

### Self-balancing trees

These are also sorted, but as you insert nodes, the tree will remain balanced. REALLY COOL, but also tricky to implement.

A category of *data structures*. Examples: red-black trees, AVL trees, B-trees.

Common operations

- Insertion, O(log n)
- Search for a value, O(log n)
- Remove a value, O(log n)

### Trie

This is a kind of tree. You take a string key and split it into letters. Each letter becomes a single child and the entire sequence of letters is the path leading to the value for that key. Comes from the "trie" in "reTRIEval". Sometimes people pronounce it "tree", I pronounce it "try" because I'm sane and want to stay that way.

Metaphor: library bookshelves.

Good use cases:

- "Autocomplete"
- Prefix based searching
- Can be space efficient for storing keys that might have a lot of overlap

A psuedo-example. Our starting "trie":

```js
const trie = {};
```

We add the key `corey` to this trie:

```js
const trie = {
  c: {
    o: {
      r: {
        e: {
          y: true
        }
      }
    }
  }
};
```

We add the key `cassio` and `connie` to this trie:

```js
const trie = {
  c: {
    o: {
      r: {
        e: {
          y: true
        }
      },
      n: {
        n: {
          i: {
            e: true
          }
        }
      }
    },
    a: {
      s: {
        s: {
          i: {
            o: true
          }
        }
      }
    }
  }
};
```

This is a *data structure*.

Common operations:

- Add a key, O(1)
- Lookup a key, O(1)
- Lookup to see parts of a key, O(n) where n is the number of matches

### Heap

Also a type of tree. Almost always a binary tree (binary heap). Children must be "less than" (according to some criteria) their parent for a min-heap. OR children must be "greater than" their parent for a max-heap. DIFFERENT than a binary search tree.

Important thing about heaps: they are "self-balancing".

Metaphor: family tree OR organizational hierarchy.

Good use cases:

- Keeping track of a max / min
- Maybe "get top-rated"

Example-ish of a heap:

```
- Carol (70 yo)
  - Michael (50 yo)
    - Brandy (31 yo)
    - Joe (32 yo)
  - Molly (29 yo)
    - Odie (3 yo)
    - Thunder (6 yo)
```

Exampe as a BST (which makes less sense):

```
- Molly (29 yo)
  - Thunder (6 yo)
    - Odie (3 yo)
  - Joe (32 yo)
    - Brandy (31 yo)
    - Carol (70 yo)
      - Michael (50 yo)
```

This is an *abstract data type*. Potential backed by an array or by a binary tree.

Common operations:

- Find the max (or min), O(1) just look at the root
- Remove the root, O(log n)
- Add a child, O(log n)
- Search for a value, O(n) NOT good for this

## Graph

NOT THE KIND WITH FANCY LINES / BARS. *Not a chart*. A set of nodes that each have edges (pointers) to other nodes. Nodes can point to the same node, the graph can have cycles. Entirely freeform.

Important to keep in mind: lots of different types of graphs, and traversal is a fairly common operation.

Metaphor: friend graph (e.g. facebook), map.

Good use cases:

- Information stored in relationships
- Arbitraty paths / flows: flowcharts, choose-your-adventure

This is a *data structure*.

Common operations:

- Traversing all nodes, O(n)
- Check if a path exists between two nodes, O(n)

## `Map` (JS)

Maps are like objects, but where the keys can themselves be objects.

```js
const container = new Map();
// OLD NEWS
container.set('foo', 5);
container.get('foo'); // 5
// NEW THING
const someRandomObj = {x: 100, y: 50};
container.set(someRandomObj, 'hello');
container.get(someRandomObj); // 'hello'
```

`Map.prototype`: `.set`, `.get`, `.has`, `.delete`,  `.keys`

## `Set` (JS)

Sets are like arrays, but where each key / element is unique and lookup to check if an element exists is sublinear time, O(1) or O(log n).

```js
const container = new Set();
container.add(10);
container.add(20);
container.add(15);
container.add(2);
container.add('why');
const someObj = {foo: 'bar'};
container.add(someObj);
// checking if an element exists is FAST
container.has(20); // true
container.has(someObj); // true
container.has(100000); // false
// nothing changes if we add an existing element
console.log(container.size); // 6
container.add(20);
console.log(container.size); // 6
```

`Set.prototype`: `.add`, `.has`, `.delete`
