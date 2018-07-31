'use strict'

// All the sub-parsers take an Array of Tokens, and return a tuple of
// (a token or parse tree) and (the tokens which the parser did not consume).

// parseBread :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseBread = tokens => {
	const next = tokens[0]
	// Bread -> 'rye'
	// Bread -> 'wheat'
	if (next.value === 'rye' || next.value === 'wheat') {
		return {
			parseTree: {
				type: 'Bread',
				childLiteral: next.value,
			},
			remainingTokens: tokens.slice(1),
		}
	}
	// otherwise, we have a bad string!
	throw Error(`Unexpected token: ${next.value}`)
}

// parseFilling :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseFilling = tokens => {
	const next = tokens[0]
	// Filling -> 'ham'
	// Filling -> 'cheese'
	// Filling -> 'mustard'
	if (
		next.value === 'ham' ||
		next.value === 'cheese' ||
		next.value === 'mustard'
	) {
		return {
			parseTree: {
				type: 'Filling',
				childLiteral: next.value,
			},
			remainingTokens: tokens.slice(1),
		}
	}
	// otherwise, we have a bad string!
	throw Error(`Unexpected token: ${next.value}`)
}

// parseMoreFillings :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseMoreFillings = tokens => {
	const next = tokens[0]
	// MoreFillings -> nothing
	if (!next || next.value !== 'and') {
		return {
			parseTree: {
				type: 'Epsilon',
			},
			remainingTokens: tokens, // did not use any tokens
		}
	}
	// MoreFillings -> 'and' Filling MoreFillings
	const fillingResult = parseFilling(tokens.slice(1))
	const moreFillingsResult = parseMoreFillings(fillingResult.remainingTokens)
	return {
		parseTree: {
			type: 'MoreFillings',
			childFilling: fillingResult.parseTree,
			childMoreFillings: moreFillingsResult.parseTree,
		},
		remainingTokens: moreFillingsResult.remainingTokens,
	}
}

// parseSandwich :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseSandwich = tokens => {
	// Sandwich -> Filling MoreFillings 'on' Bread
	const fillingResult = parseFilling(tokens)
	const moreFillingsResult = parseMoreFillings(fillingResult.remainingTokens)
	const breadTokens = moreFillingsResult.remainingTokens.slice(1) // skip 'on'
	const breadResult = parseBread(breadTokens)
	return {
		parseTree: {
			type: 'Sandwich',
			childFilling: fillingResult.parseTree,
			childMoreFillings: moreFillingsResult.parseTree,
			childBread: breadResult.parseTree,
		},
		remainingTokens: breadResult.remainingTokens,
	}
}

// parse :: [Token] -> ParseTree (for a sandwich)
const parse = tokens => parseSandwich(tokens).parseTree

module.exports = {
	parseBread,
	parseFilling,
	parseMoreFillings,
	parseSandwich,
	parse,
}
