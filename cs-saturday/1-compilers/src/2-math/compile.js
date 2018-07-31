'use strict'

const { lex } = require('./1-lexer')
const { parse } = require('./2-parser')
const { evaluate: evaluateTree, rpn } = require('./3-generator')

// could import this e.g. from Ramda, but it's small enough to define inline.
const pipe = (...fns) => input => fns.reduce((data, fn) => fn(data), input)

// frontEnd :: String -> ParseTree
const frontEnd = pipe(lex, parse)

// backEnd :: ParseTree -> String
const backEnd = rpn

// compile :: String -> String
const compile = pipe(frontEnd, backEnd)

// evaluate :: String -> String
const evaluate = pipe(frontEnd, evaluateTree)

// used in final tests & CLI
module.exports = {
	evaluate,
	compile,
}
