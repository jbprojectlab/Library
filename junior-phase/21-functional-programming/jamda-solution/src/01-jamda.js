'use strict'

// prop :: (String, Object) -> *
const prop = (propName, obj) => obj[propName]

// equals :: (*, *) -> Boolean
const equals = (a, b) => a === b

// gte :: (Number, Number) -> Boolean
const gte = (a, b) => a >= b

// both :: (Function, Function, *) -> Boolean
const both = (aTest, bTest, c) => aTest(c) && bTest(c)

// flip :: (Function, *, *) -> *
const flip = (func, a, b) => func(b, a)

// map :: (Function, Array) -> Array
const map = (mapper, arr) => arr.map(mapper)

// filter :: (Function, Array) -> Array
const filter = (predicate, arr) => arr.filter(predicate)

// sort :: (Function, Array) -> Array
const sort = (comparator, arr) => arr.slice().sort(comparator)

// descend :: (Function, *, *) -> Number
const descend = (checker, v1, v2) => {
    const res1 = checker(v1)
    const res2 = checker(v2)
    if (res1 === res2) return 0
    if (res1 < res2) return 1
    return -1
}

// pick :: ([String], Object) -> Object
const pick = (props, obj) =>
    props.reduce(
        (newObj, propName) => ({ ...newObj, [propName]: obj[propName] }),
        {},
    )

// uniqBy :: (Function, Array) -> Array
const uniqBy = (matcher, arr) => {
    // possible to do via pure FP, but easier to cheat
    const seen = new Set()
    return arr.filter(el => {
        const matchVal = matcher(el)
        if (seen.has(matchVal)) return false
        seen.add(matchVal)
        return true
    })
}

// pipe :: (...Functions) -> Function
const pipe = (fn1, ...fns) => (...initialArgs) =>
    fns.reduce((lastOutput, nextFn) => nextFn(lastOutput), fn1(...initialArgs))

// We curry everything for you. For extra-hard mode, implement curry yourself.
// http://ramdajs.com/docs/#curry
const { curry } = require('ramda')

module.exports = {
    prop: prop && curry(prop),
    equals: equals && curry(equals),
    gte: gte && curry(gte),
    map: map && curry(map),
    filter: filter && curry(filter),
    uniqBy: uniqBy && curry(uniqBy),
    sort: sort && curry(sort),
    descend: descend && curry(descend),
    both: both && curry(both),
    pick: pick && curry(pick),
    flip: flip && curry(flip),
    pipe,
}
