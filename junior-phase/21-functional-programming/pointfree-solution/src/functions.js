'use strict'

const { curry } = require('ramda')

/**
 * Pre-defined functions you are allowed to use. These have all already been
 * curried for you, so you can partially apply them. You will probably need to
 * use all of these, AND you will also have to derive new functions through
 * both partial application and composition in order to pass the specs. Many of
 * these functions exist in Ramda already, but we implement them here to make
 * it easy to see what they do without consulting the Ramda docs.
 */

// :: Number -> Number
const square = x => x ** 2

// :: Number -> Number -> Number
const add = curry((a, b) => a + b)
const multiply = curry((a, b) => a * b)

// :: Function -> Array -> Array
const map = curry((mapper, arr) => arr.map(mapper))
const filter = curry((predicate, arr) => arr.filter(predicate))

// :: Function -> * -> Array -> Array
const reduce = curry((reducer, start, arr) => arr.reduce(reducer, start))

// :: (String | Array) -> Number
const length = items => items.length

// :: Number -> (String | Array) -> (String | Array)
const take = curry((number, items) => items.slice(0, number))

// :: * -> * -> Boolean
const equals = curry((a, b) => a === b)
const isGreaterThan = curry((a, b) => b > a)

// :: Boolean -> Boolean -> Boolean
const and = curry((a, b) => a && b)

// :: Boolean -> Boolean
const not = b => !b

// :: Function -> Function -> * -> Boolean
const both = curry((p1, p2, arg) => p1(arg) && p2(arg))
const either = curry((p1, p2, arg) => p1(arg) || p2(arg))

// :: String -> Object -> *
const prop = curry((propName, obj) => obj[propName])

module.exports = {
    square,
    add,
    multiply,
    map,
    filter,
    reduce,
    length,
    take,
    equals,
    isGreaterThan,
    and,
    not,
    both,
    either,
    prop,
}
