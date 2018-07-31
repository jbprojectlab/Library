'use strict'

const { lex } = require('./1-lexer')
const { parse } = require('./2-parser')
const { shorthand } = require('./3-generator')

// could import this e.g. from Ramda, but it's small enough to define inline.
const pipe = (...fns) => input => fns.reduce((data, fn) => fn(data), input)

// frontEnd :: String -> ParseTree
const frontEnd = pipe(lex, parse)

// backEnd :: ParseTree -> String
const backEnd = shorthand

// compile :: String -> String
const compile = pipe(frontEnd, backEnd)

// used in final tests
module.exports = compile
