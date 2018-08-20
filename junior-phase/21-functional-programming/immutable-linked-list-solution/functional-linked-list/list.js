const getSha1 = require('../getSha1')

class ListNode {
  constructor (value, next = null) {
    this.value = value
    this.next = next
    this.id = getSha1(value)
  }

  prepend (value) {
    return new ListNode(value, this)
  }

  length () {
    if (!this.next) return 1
    return 1 + this.next.length()
  }

  _getIds () {
    if (!this.next) return [this.id]
    return [this.id, ...this.next._getIds()]
  }

  toString () {
    return `[${this._getIds().join(' ')}]`
  }

  append (tail) {
    return new ListNode(
      this.value,
      this.next
        ? this.next.append(tail)
        : tail
    )
  }

  remove (id) {
    if (this.id === id) return this.next
    return new ListNode(
      this.value,
      this.next && this.next.remove(id)
    )
  }

  takeUntil (id) {
    if (this.id === id) return null
    return new ListNode(
      this.value,
      this.next && this.next.takeUntil(id)
    )
  }

  dropUntil (id) {
    if (this.id === id) return this
    return this.next && this.next.dropUntil(id)
  }

  insertAt (id, list) {
    if (this.id === id) return list.append(this)
    return new ListNode(
      this.value,
      this.next && this.next.insertAt(id, list)
    )
  }

  intersection (list) {
    if (this.id === list.id) return this
    return this.length() >= list.length()
      ? this.next && this.next.intersection(list)
      : list.next && list.next.intersection(this)
  }
}

module.exports = ListNode
