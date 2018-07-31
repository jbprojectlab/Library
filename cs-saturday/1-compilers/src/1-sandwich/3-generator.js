'use strict'

const { inspect } = require('util')
const prettyString = val => inspect(val, false, null, true)

// prettier-ignore
// original :: ParseTree -> String
const original = node => {
	switch (node.type) {
		case 'Bread':        return node.childLiteral
		case 'Filling':      return node.childLiteral
		case 'Epsilon':      return ''
		case 'MoreFillings': return ' and ' + original(node.childFilling) + original(node.childMoreFillings)
		case 'Sandwich':     return (
			original(node.childFilling) +
			original(node.childMoreFillings) +
			' on ' + original(node.childBread)
		)
		default: break
	}
	// if we didn't handle a given case, something has gone wrong
	throw Error(`Compilation error, unexpected node: ${prettyString(node)}`)
}

// prettier-ignore
// Example: 'R(hcm)' = Rye + ham, cheese, mustard
// shorthand :: ParseTree -> String
const shorthand = node => {
	switch (node.type) {
		case 'Bread':        return node.childLiteral[0].toUpperCase()
		case 'Filling':      return node.childLiteral[0]
		case 'Epsilon':      return ''
		case 'MoreFillings': return shorthand(node.childFilling) + shorthand(node.childMoreFillings)
		case 'Sandwich':     return (
			shorthand(node.childBread) + '(' +
			shorthand(node.childFilling) +
			shorthand(node.childMoreFillings) + ')'
		)
		default: break
	}
	// if we didn't handle a given case, something has gone wrong
	throw Error(`Compilation error, unexpected node: ${prettyString(node)}`)
}

module.exports = {
	original,
	shorthand,
}
