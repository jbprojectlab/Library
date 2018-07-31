'use strict'
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const { expect } = chai

const { lex } = require('./1-lexer')
const {
	parseBread,
	parseFilling,
	parseMoreFillings,
	parseSandwich,
	parse,
} = require('./2-parser')

// helper functions
const verifyResultShape = result => {
	expect(result).to.be.an('object')
	expect(result).to.have.keys(['parseTree', 'remainingTokens'])
	expect(result.parseTree).to.be.an('object')
	expect(result.remainingTokens).to.be.an('array')
}

const verify = tokens => ({
	areWordTokensWithValues(values) {
		expect(tokens).to.deep.equal(
			values.map(value => ({
				type: 'Word',
				value,
			})),
		)
	},
})

describe('parser', () => {
	describe('helpers', () => {
		describe('`parseBread`', () => {
			describe(`parsing 'rye'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('rye')
					result = parseBread(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Bread` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Bread',
						childLiteral: 'rye',
					})
				})

				it('consumes one token, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues(['rye'])
				})
			})

			describe(`parsing 'wheat'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('wheat')
					result = parseBread(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Bread` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Bread',
						childLiteral: 'wheat',
					})
				})

				it('consumes one token, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues(['wheat'])
				})
			})

			describe(`parsing 'rye is delicious'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('rye is delicious')
					result = parseBread(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Bread` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Bread',
						childLiteral: 'rye',
					})
				})

				it('consumes one token, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areWordTokensWithValues([
						'is',
						'delicious',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues([
						'rye',
						'is',
						'delicious',
					])
				})
			})

			describe(`parsing non-breads, e.g. 'stale crackers'`, () => {
				it(`throws an 'Unexpected token' error`, () => {
					const tokens = lex('stale crackers')
					expect(() => parseBread(tokens)).to.throw(
						Error,
						/unexpected token/i, // any string containing "unexpected token"
					)
				})
			})
		})

		describe('`parseFilling`', () => {
			const fillingNames = ['ham', 'cheese', 'mustard']
			fillingNames.forEach(fillingName => {
				describe(`parsing '${fillingName}'`, () => {
					let result, tokens
					beforeEach(() => {
						tokens = lex(fillingName)
						result = parseFilling(tokens)
					})

					it('returns an object with `parseTree` and `remainingTokens`', () => {
						verifyResultShape(result)
					})

					it('builds a `Filling` parse tree node', () => {
						expect(result.parseTree).to.deep.equal({
							type: 'Filling',
							childLiteral: fillingName,
						})
					})

					it('consumes one token, leaving zero remaining tokens', () => {
						expect(result.remainingTokens).to.be.empty
					})

					it('does not modify the original tokens', () => {
						verify(tokens).areWordTokensWithValues([fillingName])
					})
				})
			})

			describe(`parsing 'ham is filling'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('ham is filling')
					result = parseFilling(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Filling` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Filling',
						childLiteral: 'ham',
					})
				})

				it('consumes one token, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areWordTokensWithValues([
						'is',
						'filling',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues([
						'ham',
						'is',
						'filling',
					])
				})
			})

			describe(`parsing non-fillings, e.g. 'sawdust'`, () => {
				it(`throws an 'Unexpected token' error`, () => {
					const tokens = lex('sawdust')
					expect(() => parseFilling(tokens)).to.throw(
						Error,
						/unexpected token/i, // any string containing "unexpected token"
					)
				})
			})
		})

		describe('`parseMoreFillings`', () => {
			describe(`parsing ''`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('')
					result = parseMoreFillings(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Epsilon` (nothing) parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Epsilon',
					})
				})

				it('consumes zero tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					expect(tokens).to.be.empty
				})
			})

			describe(`parsing 'on rye'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('on rye')
					result = parseMoreFillings(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Epsilon` (nothing) parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Epsilon',
					})
				})

				it('consumes zero tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areWordTokensWithValues([
						'on',
						'rye',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues(['on', 'rye'])
				})
			})

			describe(`parsing 'and cheese'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('and cheese')
					result = parseMoreFillings(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MoreFillings` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MoreFillings',
						// hmm, haven't you written a function which builds Filling nodes?
						childFilling: {
							type: 'Filling',
							childLiteral: 'cheese',
						},
						// BIG HINT: You'll need to use recursion to do this properly!
						childMoreFillings: {
							type: 'Epsilon',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues(['and', 'cheese'])
				})
			})

			describe(`parsing 'and cheese and mustard on wheat'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('and cheese and mustard on wheat')
					result = parseMoreFillings(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MoreFillings` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MoreFillings',
						childFilling: {
							type: 'Filling',
							childLiteral: 'cheese',
						},
						childMoreFillings: {
							type: 'MoreFillings',
							childFilling: {
								type: 'Filling',
								childLiteral: 'mustard',
							},
							childMoreFillings: {
								type: 'Epsilon',
							},
						},
					})
				})

				it('consumes four tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areWordTokensWithValues([
						'on',
						'wheat',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues([
						'and',
						'cheese',
						'and',
						'mustard',
						'on',
						'wheat',
					])
				})
			})
		})

		describe('`parseSandwich`', () => {
			describe(`parsing 'ham on rye'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('ham on rye')
					result = parseSandwich(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Sandwich` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Sandwich',
						childFilling: {
							type: 'Filling',
							childLiteral: 'ham',
						},
						childMoreFillings: {
							type: 'Epsilon',
						},
						childBread: {
							type: 'Bread',
							childLiteral: 'rye',
						},
					})
				})

				it('consumes three tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues(['ham', 'on', 'rye'])
				})
			})

			describe(`parsing 'ham and cheese on wheat please!'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('ham and cheese on wheat please!')
					result = parseSandwich(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Sandwich` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Sandwich',
						childFilling: {
							type: 'Filling',
							childLiteral: 'ham',
						},
						childMoreFillings: {
							type: 'MoreFillings',
							childFilling: {
								type: 'Filling',
								childLiteral: 'cheese',
							},
							childMoreFillings: {
								type: 'Epsilon',
							},
						},
						childBread: {
							type: 'Bread',
							childLiteral: 'wheat',
						},
					})
				})

				it('consumes five tokens, leaving one remaining token', () => {
					verify(result.remainingTokens).areWordTokensWithValues([
						'please!',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areWordTokensWithValues([
						'ham',
						'and',
						'cheese',
						'on',
						'wheat',
						'please!',
					])
				})
			})
		})
	})

	describe('`parse`', () => {
		it('returns a parse tree for a sandwich from an array of input tokens', () => {
			const tokens = lex('cheese and cheese and cheese on rye')
			const tree = parse(tokens)
			expect(tree).to.deep.equal({
				type: 'Sandwich',
				childFilling: {
					type: 'Filling',
					childLiteral: 'cheese',
				},
				childMoreFillings: {
					type: 'MoreFillings',
					childFilling: {
						type: 'Filling',
						childLiteral: 'cheese',
					},
					childMoreFillings: {
						type: 'MoreFillings',
						childFilling: {
							type: 'Filling',
							childLiteral: 'cheese',
						},
						childMoreFillings: {
							type: 'Epsilon',
						},
					},
				},
				childBread: {
					type: 'Bread',
					childLiteral: 'rye',
				},
			})
		})
	})
})
