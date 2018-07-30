'use strict';

/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

// -----------------------------------------
// Stacks

class Stack {
  // Stack constructor function
  constructor () {
    // your code here
  }

  // Stack.prototype.add
  add (item) {
    // your code here
    return this; // for chaining, do not edit
  }

  // Stack.prototype.remove
  remove () {
    // your code here
  }
}

// -----------------------------------------
// Queues

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

class Queue {
  // Queue constructor function
  constructor () {
    // your code here
  }

  // Queue.prototype.add
  add (item) {
    // your code here
    return this; // for chaining, do not edit
  }

  // Queue.prototype.remove
  remove () {
    // your code here
  }
}

// -----------------------------------------
// Linked lists

// EXTRA CREDIT: remove the `pending` line in the spec to attempt.

class LinkedList {
  // LinkedList constructor function
  constructor () {
    this.head = this.tail = null;
  }

  // LinkedList.prototype.addToTail
  addToTail (item) {
    // your code here
    return this; // for chaining, do not edit
  }

  // LinkedList.prototype.removeFromTail
  removeFromTail () {
    // your code here
  }

  // LinkedList.prototype.forEach
  forEach (callbackFunc) {
    // your code here
  }
}

class ListNode {
  // ListNode constructor function
  constructor (item, prev, next) {
    this.item = item;
    this.next = next || null;
    this.prev = prev || null;
  }
}

//-----------------------------------------
// Association lists

class Alist {
  // Alist constructor function
  constructor () {
    // your code here
  }

  // Alist.prototype.set
  set (key, value) {
    // your code here
    return this; // for chaining; do not edit
  }

  // Alist.prototype.get
  get (key) {
    // your code here
  }
}

class AlistNode {
  // AlistNode constructor function
  constructor (key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

//-----------------------------------------
// Hash Tables

function hash (key) {
  let hashedKey = 0;
  for (let i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

class HashTable {
  // HashTable constructor function
  constructor () {
    this.buckets = Array(20);
    // your code here
  }

  // HashTable.prototype.set
  set (key, value) {
    // your code here. DO NOT simply set a prop. on an obj., that's cheating!
    return this; // for chaining, do not edit
  }

  // HashTable.prototype.get
  get (key) {
    // your code here. DO NOT simply get a prop. from an obj., that's cheating!
  }
}

//-----------------------------------------
// Binary search trees

class BinarySearchTree {
  // BinarySearchTree constructor function
  constructor (val) {
    // your code here
  }

  // BinarySearchTree.prototype.insert
  insert (val) {
    // your code here
    return this; // for chaining, do not edit
  }

  // BinarySearchTree.prototype.min
  min () {
    // your code here
  }

  // BinarySearchTree.prototype.max
  max () {
    // your code here
  }

  // BinarySearchTree.prototype.contains
  contains (val) {
    // your code here
  }

  // BinarySearchTree.prototype.traverse
  traverse (callbackFunc) {
    // your code here
  }
}
