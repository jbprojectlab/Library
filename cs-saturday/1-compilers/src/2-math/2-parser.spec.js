'use strict'
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const { expect } = chai

const { lex } = require('./1-lexer')
const { verify } = require('./1-lexer.spec')
const {
	parse,
	parseFactor,
	parseF2,
	parseTerm,
	parseT2,
	parseExpression,
} = require('./2-parser')

// helper function
const verifyResultShape = result => {
	expect(result).to.be.an('object')
	expect(result).to.have.keys(['parseTree', 'remainingTokens'])
	expect(result.parseTree).to.be.an('object')
	expect(result.remainingTokens).to.be.an('array')
}

describe('parser', () => {
	describe('helpers', () => {
		describe('`parseFactor`', () => {
			describe(`parsing '27'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('27')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `NumericF` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'NumericF',
						childNumber: '27',
					})
				})

				it('consumes one token, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Number'])
				})
			})

			describe(`parsing '32 + 4'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('32 + 4')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `NumericF` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'NumericF',
						childNumber: '32',
					})
				})

				it('consumes one token, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Number',
						'Plus',
						'Number',
					])
				})
			})

			describe(`parsing '-7'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('-7')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `NegativeF` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'NegativeF',
						// hint: do not make this child tree manually. Use recursion!
						childFactor: {
							type: 'NumericF',
							childNumber: '7',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Minus', 'Number'])
				})
			})

			describe(`parsing '-93 * (12)'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('-93 * (12)')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `NegativeF` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'NegativeF',
						// hint: use recursion!
						childFactor: {
							type: 'NumericF',
							childNumber: '93',
						},
					})
				})

				it('consumes two tokens, leaving four remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Star',
						'LParen',
						'Number',
						'RParen',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Minus',
						'Number',
						'Star',
						'LParen',
						'Number',
						'RParen',
					])
				})
			})

			describe(`parsing '/45'`, () => {
				const bad = () => parseFactor('/45')

				it('throws an error', () => {
					expect(bad).to.throw
				})
			})
		})

		describe('`parseF2`', () => {
			describe(`parsing ''`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `EpsilonF2` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'EpsilonF2',
					})
				})

				it('consumes zero tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					expect(tokens).to.be.empty
				})
			})

			describe(`parsing '+ 45 / 9'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('+ 45 / 9')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `EpsilonF2` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'EpsilonF2',
					})
				})

				it('consumes zero tokens, leaving four remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Number',
						'Slash',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Plus',
						'Number',
						'Slash',
						'Number',
					])
				})
			})

			describe(`parsing '* 13'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('* 13')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MultiplicativeF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MultiplicativeF2',
						// hint: use previously-defined functions!
						childFactor: {
							type: 'NumericF',
							childNumber: '13',
						},
						// remember recursion?
						childF2: {
							type: 'EpsilonF2',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Star', 'Number'])
				})
			})

			describe(`parsing '* 9 - 762'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('* 9 - 762')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MultiplicativeF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MultiplicativeF2',
						// hint: use previously-defined functions!
						childFactor: {
							type: 'NumericF',
							childNumber: '9',
						},
						// remember recursion?
						childF2: {
							type: 'EpsilonF2',
						},
					})
				})

				it('consumes two tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Star',
						'Number',
						'Minus',
						'Number',
					])
				})
			})

			describe(`parsing '* 1 * 6 * 2 + -5'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('* 1 * 6 * 2 + -5')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MultiplicativeF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MultiplicativeF2',
						// hint: use previously-defined functions!
						childFactor: {
							type: 'NumericF',
							childNumber: '1',
						},
						// remember recursion? Don't try to make this object yourself, you already have code which does that for you!
						childF2: {
							type: 'MultiplicativeF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '6',
							},
							childF2: {
								type: 'MultiplicativeF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '2',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
					})
				})

				it('consumes six tokens, leaving three remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Star',
						'Number',
						'Star',
						'Number',
						'Star',
						'Number',
						'Plus',
						'Minus',
						'Number',
					])
				})
			})

			describe(`parsing '/ 13'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('/ 13')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `DivisionalF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'DivisionalF2',
						childFactor: {
							type: 'NumericF',
							childNumber: '13',
						},
						childF2: {
							type: 'EpsilonF2',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Slash', 'Number'])
				})
			})

			describe(`parsing '/ 9 - 762'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('/ 9 - 762')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `DivisionalF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'DivisionalF2',
						childFactor: {
							type: 'NumericF',
							childNumber: '9',
						},
						childF2: {
							type: 'EpsilonF2',
						},
					})
				})

				it('consumes two tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Slash',
						'Number',
						'Minus',
						'Number',
					])
				})
			})

			describe(`parsing '/ 1 / 6 / 2 + -5'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('/ 1 / 6 / 2 + -5')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `DivisionalF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'DivisionalF2',
						childFactor: {
							type: 'NumericF',
							childNumber: '1',
						},
						childF2: {
							type: 'DivisionalF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '6',
							},
							childF2: {
								type: 'DivisionalF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '2',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
					})
				})

				it('consumes six tokens, leaving three remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Slash',
						'Number',
						'Slash',
						'Number',
						'Slash',
						'Number',
						'Plus',
						'Minus',
						'Number',
					])
				})
			})

			describe(`parsing '* -8 / 3 - 0'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('* -8 / 3 - 0')
					result = parseF2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `MultiplicativeF2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'MultiplicativeF2',
						childFactor: {
							type: 'NegativeF',
							childFactor: {
								type: 'NumericF',
								childNumber: '8',
							},
						},
						childF2: {
							type: 'DivisionalF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '3',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
					})
				})

				it('consumes five tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Star',
						'Minus',
						'Number',
						'Slash',
						'Number',
						'Minus',
						'Number',
					])
				})
			})
		})

		describe('`parseTerm`', () => {
			describe(`parsing '3 * 5'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('3 * 5')
					result = parseTerm(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Term` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Term',
						childFactor: {
							type: 'NumericF',
							childNumber: '3',
						},
						childF2: {
							type: 'MultiplicativeF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '5',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
					})
				})

				it('consumes three tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Number',
						'Star',
						'Number',
					])
				})
			})

			describe(`parsing '12 / 4'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('12 / 4')
					result = parseTerm(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Term` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Term',
						childFactor: {
							type: 'NumericF',
							childNumber: '12',
						},
						childF2: {
							type: 'DivisionalF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '4',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
					})
				})

				it('consumes three tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Number',
						'Slash',
						'Number',
					])
				})
			})

			describe(`parsing '-99 * 1/2 + -76'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('-99 * 1/2 + -76')
					result = parseTerm(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `Term` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Term',
						childFactor: {
							type: 'NegativeF',
							childFactor: {
								type: 'NumericF',
								childNumber: '99',
							},
						},
						childF2: {
							type: 'MultiplicativeF2',
							childFactor: {
								type: 'NumericF',
								childNumber: '1',
							},
							childF2: {
								type: 'DivisionalF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '2',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
					})
				})

				it('consumes six tokens, leaving three remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Minus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Minus',
						'Number',
						'Star',
						'Number',
						'Slash',
						'Number',
						'Plus',
						'Minus',
						'Number',
					])
				})
			})
		})

		describe('`parseT2`', () => {
			describe(`parsing ''`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `EpsilonT2` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'EpsilonT2',
					})
				})

				it('consumes zero tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					expect(tokens).to.be.empty
				})
			})

			describe(`parsing ') + (9)'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex(') + (9)')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `EpsilonT2` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'EpsilonT2',
					})
				})

				it('consumes zero tokens, leaving five remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'RParen',
						'Plus',
						'LParen',
						'Number',
						'RParen',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'RParen',
						'Plus',
						'LParen',
						'Number',
						'RParen',
					])
				})
			})

			describe(`parsing '/ 45 + 9'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('/ 45 + 9')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `EpsilonT2` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'EpsilonT2',
					})
				})

				it('consumes zero tokens, leaving four remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Slash',
						'Number',
						'Plus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Slash',
						'Number',
						'Plus',
						'Number',
					])
				})
			})

			describe(`parsing '+ 13'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('+ 13')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `AdditiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'AdditiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '13',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
						childT2: {
							type: 'EpsilonT2',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Plus', 'Number'])
				})
			})

			describe(`parsing '+ 3/4'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('+ 3/4')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `AdditiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'AdditiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '3',
							},
							childF2: {
								type: 'DivisionalF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '4',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
						childT2: {
							type: 'EpsilonT2',
						},
					})
				})

				it('consumes four tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Plus',
						'Number',
						'Slash',
						'Number',
					])
				})
			})

			describe(`parsing '+ 8 + 2'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('+ 8 + 2')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `AdditiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'AdditiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '8',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
						childT2: {
							type: 'AdditiveT2',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '2',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes four tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Plus',
						'Number',
						'Plus',
						'Number',
					])
				})
			})

			describe(`parsing '- 13'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('- 13')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `SubtractiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'SubtractiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '13',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
						childT2: {
							type: 'EpsilonT2',
						},
					})
				})

				it('consumes two tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes(['Minus', 'Number'])
				})
			})

			describe(`parsing '- 3/4'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('- 3/4')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `SubtractiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'SubtractiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '3',
							},
							childF2: {
								type: 'DivisionalF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '4',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
						childT2: {
							type: 'EpsilonT2',
						},
					})
				})

				it('consumes four tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Minus',
						'Number',
						'Slash',
						'Number',
					])
				})
			})

			describe(`parsing '- 8 - 2'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('- 8 - 2')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `SubtractiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'SubtractiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '8',
							},
							childF2: {
								type: 'EpsilonF2',
							},
						},
						childT2: {
							type: 'SubtractiveT2',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '2',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes four tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Minus',
						'Number',
						'Minus',
						'Number',
					])
				})
			})

			describe(`parsing '+ 1/64 - 5 * 4'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('+ 1/64 - 5 * 4')
					result = parseT2(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `AdditiveT2` parse tree', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'AdditiveT2',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '1',
							},
							childF2: {
								type: 'DivisionalF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '64',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
						childT2: {
							type: 'SubtractiveT2',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '5',
								},
								childF2: {
									type: 'MultiplicativeF2',
									childFactor: {
										type: 'NumericF',
										childNumber: '4',
									},
									childF2: {
										type: 'EpsilonF2',
									},
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes eight tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Plus',
						'Number',
						'Slash',
						'Number',
						'Minus',
						'Number',
						'Star',
						'Number',
					])
				})
			})
		})

		describe('`parseExpression`', () => {
			describe(`parsing '3 * 5'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('3 * 5')
					result = parseExpression(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `Expression` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Expression',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '3',
							},
							childF2: {
								type: 'MultiplicativeF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '5',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
						childT2: {
							type: 'EpsilonT2',
						},
					})
				})

				it('consumes three tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Number',
						'Star',
						'Number',
					])
				})
			})

			describe(`parsing '3 * 5 + 1'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('3 * 5 + 1')
					result = parseExpression(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds an `Expression` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'Expression',
						childTerm: {
							type: 'Term',
							childFactor: {
								type: 'NumericF',
								childNumber: '3',
							},
							childF2: {
								type: 'MultiplicativeF2',
								childFactor: {
									type: 'NumericF',
									childNumber: '5',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
						},
						childT2: {
							type: 'AdditiveT2',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '1',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes five tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'Number',
						'Star',
						'Number',
						'Plus',
						'Number',
					])
				})
			})
		})

		describe('`parseFactor` (again)', () => {
			describe(`parsing '(27)'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('(27)')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `GroupF` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'GroupF',
						childExpression: {
							type: 'Expression',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '27',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes three tokens, leaving zero remaining tokens', () => {
					expect(result.remainingTokens).to.be.empty
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'LParen',
						'Number',
						'RParen',
					])
				})
			})

			describe(`parsing '(27) + 9'`, () => {
				let result, tokens
				beforeEach(() => {
					tokens = lex('(27) + 9')
					result = parseFactor(tokens)
				})

				it('returns an object with `parseTree` and `remainingTokens`', () => {
					verifyResultShape(result)
				})

				it('builds a `GroupF` parse tree node', () => {
					expect(result.parseTree).to.deep.equal({
						type: 'GroupF',
						childExpression: {
							type: 'Expression',
							childTerm: {
								type: 'Term',
								childFactor: {
									type: 'NumericF',
									childNumber: '27',
								},
								childF2: {
									type: 'EpsilonF2',
								},
							},
							childT2: {
								type: 'EpsilonT2',
							},
						},
					})
				})

				it('consumes three tokens, leaving two remaining tokens', () => {
					verify(result.remainingTokens).areTokensWithTypes([
						'Plus',
						'Number',
					])
				})

				it('does not modify the original tokens', () => {
					verify(tokens).areTokensWithTypes([
						'LParen',
						'Number',
						'RParen',
						'Plus',
						'Number',
					])
				})
			})
		})
	})

	describe('`parse`', () => {
		it('returns a parse tree for an expression from an array of input tokens', () => {
			const tokens = lex('-3 / (4 - 2 * 2) + 1')
			const tree = parse(tokens)
			expect(tree).to.deep.equal({
				type: 'Expression',
				childTerm: {
					type: 'Term',
					childFactor: {
						type: 'NegativeF',
						childFactor: {
							type: 'NumericF',
							childNumber: '3',
						},
					},
					childF2: {
						type: 'DivisionalF2',
						childFactor: {
							type: 'GroupF',
							childExpression: {
								type: 'Expression',
								childTerm: {
									type: 'Term',
									childFactor: {
										type: 'NumericF',
										childNumber: '4',
									},
									childF2: {
										type: 'EpsilonF2',
									},
								},
								childT2: {
									type: 'SubtractiveT2',
									childTerm: {
										type: 'Term',
										childFactor: {
											type: 'NumericF',
											childNumber: '2',
										},
										childF2: {
											type: 'MultiplicativeF2',
											childFactor: {
												type: 'NumericF',
												childNumber: '2',
											},
											childF2: {
												type: 'EpsilonF2',
											},
										},
									},
									childT2: {
										type: 'EpsilonT2',
									},
								},
							},
						},
						childF2: {
							type: 'EpsilonF2',
						},
					},
				},
				childT2: {
					type: 'AdditiveT2',
					childTerm: {
						type: 'Term',
						childFactor: {
							type: 'NumericF',
							childNumber: '1',
						},
						childF2: {
							type: 'EpsilonF2',
						},
					},
					childT2: {
						type: 'EpsilonT2',
					},
				},
			})
		})
	})
})
