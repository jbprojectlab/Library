'use strict'

const { pipe, compose } = require('ramda')

// Predefined, already-curried functions you can use. See `./functions.js`.

const {
    square, // square(4) === 16
    add, // add(1, 2) === 3
    multiply, // multiply(1, 2) === 2
    map, // map(toLower, ['HEY', 'YO']) -> ['hey', 'yo']
    filter, // filter(isEven, [2, 5, 8, 10, 1]) -> [2, 8, 10]
    reduce, // reduce(add, 'start-', ['point-', 'free']) === 'start-point-free'
    length, // length(['currying', 'is', 'cool']) === 3
    take, // take(5, 'hello world') === 'hello'
    equals, // equals(1, 1) === true,
    isGreaterThan, // isGreaterThan(3, 5) === true
    and, // and(true, false) === false,
    not, // not(true) === false
    both, // both(isEven, is2, 2) === true
    either, // either(isEven, is1, 2) === true
    prop, // prop('name', { name: 'Jo' }) === 'Jo'
} = require('./functions')

/**
 * Functions you must derive. Note that for this exercise, you may only create
 * functions by partially applying existing functions and/or composing
 * existing functions together. For composition, you may use Ramda's `compose`
 * and/or `pipe`, already imported for you in this module. Again, do NOT define
 * new functions from scratch (using `function` or arrows or "cheats" like
 * `eval`) – you may only "remix" starting functions and ones you derive.
 */

// inc :: Number -> Number
const inc = add(1)

// negate :: Number -> Number
const negate = multiply(-1)

// negateThenInc :: Number -> Number
const negateThenInc = pipe(negate, inc)
// const negateThenInc = compose(inc, negate)

// doubleThenDec :: Number -> Number
const doubleThenDec = pipe(multiply(2), add(-1))

// circleArea :: Number -> Number
// (Remember, circle area = radius^2 * pi)
const circleArea = pipe(square, multiply(Math.PI))

// incAll :: [Number] -> [Number]
const incAll = map(inc)

// incThenNegateAll :: [Number] -> [Number]
const incThenNegateAll = map(pipe(inc, negate))
// const incThenNegateAll = pipe(map(inc), map(negate))
// const incThenNegateAll = pipe(pipe, map)(inc, negate)

// takeTwoDoubles :: [Number] -> [Number]
const takeTwoDoubles = pipe(take(2), map(multiply(2)))
// const takeTwoDoubles = pipe(map(multiply(2)), take(2))

// sum :: [Number] -> Number
const sum = reduce(add, 0)

// product :: [Number] -> Number
const product = reduce(multiply, 1)

// allTrue :: [Boolean] -> Boolean
const allTrue = reduce(and, true)

// isSpace :: String -> Boolean
const isSpace = equals(' ')

// howManyPoints :: [String] -> Number
const howManyPoints = pipe(filter(equals('point')), length)

// rejectPoints :: [String] -> [String]
const rejectPoints = filter(compose(not, equals('point')))

// isAtLeast25 :: Number -> Boolean
const isAtLeast25 = either(equals(25), isGreaterThan(25))

// ageIsAtLeast25 :: Object -> Boolean
const ageIsAtLeast25 = pipe(prop('age'), isAtLeast25)

// isLicensed :: Object -> Boolean
const isLicensed = pipe(prop('status'), equals('licensed'))

// canRentCarWithoutSurcharge :: Object -> Boolean
const canRentCarWithoutSurcharge = both(ageIsAtLeast25, isLicensed)

// getTwoEligibleRenterNames :: [Object] -> [String]
const getTwoEligibleRenterNames = pipe(
    filter(canRentCarWithoutSurcharge),
    take(2),
    map(prop('name')),
)

module.exports = {
    inc,
    negate,
    negateThenInc,
    doubleThenDec,
    circleArea,
    incAll,
    incThenNegateAll,
    takeTwoDoubles,
    sum,
    product,
    allTrue,
    isSpace,
    howManyPoints,
    rejectPoints,
    isAtLeast25,
    ageIsAtLeast25,
    isLicensed,
    canRentCarWithoutSurcharge,
    getTwoEligibleRenterNames,
}
