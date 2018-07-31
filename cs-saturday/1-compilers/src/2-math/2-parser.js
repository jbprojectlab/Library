'use strict'

// All the sub-parsers take an Array of Tokens, and return a tuple of
// (a token or parse tree) and (the tokens which the parser did not consume).

// parseFactor :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseFactor = tokens => {
	const next = tokens[0]

	// NumericF rule: Factor -> <number literal>
	if (next.type === 'Number') {
		// implement me!
		return {
			parseTree: {
				type: 'NumericF',
				childNumber: next.value,
			},
			remainingTokens: tokens.slice(1),
		}
	}

	// NegativeF rule: Factor -> - Factor
	if (next.type === 'Minus') {
		// implement me!
		const factorResult = parseFactor(tokens.slice(1))
		return {
			parseTree: {
				type: 'NegativeF',
				childFactor: factorResult.parseTree,
			},
			remainingTokens: factorResult.remainingTokens,
		}
	}

	// GroupF rule: Factor -> (Expression)
	if (next.type === 'LParen') {
		// implement me (at the end, after `parseExpression`)
		// eslint-disable-next-line no-use-before-define
		const expressionResult = parseExpression(tokens.slice(1)) // skip LParen
		return {
			parseTree: {
				type: 'GroupF',
				childExpression: expressionResult.parseTree,
			},
			remainingTokens: expressionResult.remainingTokens.slice(1), // skip Rparen
		}
	}

	throw Error(`Parse error, unexpected token: ${next}`)
}

// parseF2 :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseF2 = tokens => {
	const next = tokens[0]

	// F2 -> EpsilonF2
	const isStar = next && next.type === 'Star'
	const isSlash = next && next.type === 'Slash'
	if (!isStar && !isSlash) {
		return {
			parseTree: {
				type: 'EpsilonF2',
			},
			remainingTokens: tokens,
		}
	}

	// MultiplicativeF2 rule: F2 -> * Factor F2
	// DivisionalF2 rule:     F2 -> / Factor F2
	const factorResult = parseFactor(tokens.slice(1))
	const f2Result = parseF2(factorResult.remainingTokens)
	return {
		parseTree: {
			type: isStar ? 'MultiplicativeF2' : 'DivisionalF2',
			childFactor: factorResult.parseTree,
			childF2: f2Result.parseTree,
		},
		remainingTokens: f2Result.remainingTokens,
	}
}

// parseTerm :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseTerm = tokens => {
	// Term -> Factor F2

	const factorResult = parseFactor(tokens)
	const f2Result = parseF2(factorResult.remainingTokens)

	return {
		parseTree: {
			type: 'Term',
			childFactor: factorResult.parseTree,
			childF2: f2Result.parseTree,
		},
		remainingTokens: f2Result.remainingTokens,
	}
}

// parseT2 :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseT2 = tokens => {
	const next = tokens[0]

	// T2 -> EpsilonT
	const isAdd = next && next.type === 'Plus'
	const isSub = next && next.type === 'Minus'
	if (!isAdd && !isSub) {
		return {
			parseTree: { type: 'EpsilonT2' },
			remainingTokens: tokens,
		}
	}

	// T2 -> + Term T2
	// T2 -> - Term T2
	const termResult = parseTerm(tokens.slice(1))
	const t2Result = parseT2(termResult.remainingTokens)
	return {
		parseTree: {
			type: isAdd ? 'AdditiveT2' : 'SubtractiveT2',
			childTerm: termResult.parseTree,
			childT2: t2Result.parseTree,
		},
		remainingTokens: t2Result.remainingTokens,
	}
}

// parseExpression :: [Token] -> { parseTree: ParseTree, remainingTokens: [Token] }
const parseExpression = tokens => {
	// Expression -> Term T2

	const termResult = parseTerm(tokens)
	const t2Result = parseT2(termResult.remainingTokens)
	return {
		parseTree: {
			type: 'Expression',
			childTerm: termResult.parseTree,
			childT2: t2Result.parseTree,
		},
		remainingTokens: t2Result.remainingTokens,
	}
}

// parse :: [Token] -> ParseTree (for an expression)
const parse = tokens => parseExpression(tokens).parseTree // implement me!

module.exports = {
	parseFactor,
	parseF2,
	parseTerm,
	parseT2,
	parseExpression,
	parse,
}
