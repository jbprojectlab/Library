'use strict'
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const { expect } = chai

const { lex } = require('./1-lexer')
const { parse } = require('./2-parser')
const frontend = expressionStr => parse(lex(expressionStr))

const { original, shorthand } = require('./3-generator')

describe('generator', () => {
	describe('original', () => {
		it('when given a Bread parse tree, returns the literal bread name', () => {
			const tree = {
				type: 'Bread',
				childLiteral: 'rye',
			}
			const string = original(tree)
			expect(string).to.equal('rye')
		})

		it('when given a Filling parse tree, returns the literal filling name', () => {
			const tree = {
				type: 'Filling',
				childLiteral: 'ham',
			}
			const string = original(tree)
			expect(string).to.equal('ham')
		})

		it('when given an Epsilon parse tree, returns the string equivalent of "nothing"', () => {
			const tree = {
				type: 'Epsilon',
			}
			const string = original(tree)
			expect(string).to.be.empty
		})

		// HINT: use recursion!
		it('when given a MoreFillings parse tree, returns original string of extra fillings', () => {
			const tree = {
				type: 'MoreFillings',
				childFilling: {
					type: 'Filling',
					childLiteral: 'cheese',
				},
				childMoreFillings: {
					type: 'Epsilon',
				},
			}
			const string = original(tree)
			expect(string).to.equal(' and cheese') // Note the leading space!
		})

		it('when given a Sandwich parse tree, returns original sandwich description', () => {
			const tree = {
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
					childLiteral: 'rye',
				},
			}
			const string = original(tree)
			expect(string).to.equal('ham and cheese on rye')
		})

		const examples = [
			'ham and cheese and mustard on rye',
			'cheese and cheese on wheat',
			'cheese on rye',
			'ham and cheese and ham and cheese on wheat',
		]

		examples.forEach(example => {
			it(`compiles '${example}' to the same string`, () => {
				const tree = frontend(example)
				expect(original(tree)).to.equal(example)
			})
		})
	})

	describe('shorthand', () => {
		// no handholding on this one, see if you can emulate the examples!

		const examples = [
			{ in: 'ham and cheese and mustard on rye', out: 'R(hcm)' },
			{ in: 'cheese and cheese on wheat', out: 'W(cc)' },
			{ in: 'cheese on rye', out: 'R(c)' },
			{
				in: 'ham and cheese and ham and cheese on wheat',
				out: 'W(hchc)',
			},
		]

		examples.forEach(example => {
			it(`compiles '${example.in}' to ${example.out}`, () => {
				const tree = frontend(example.in)
				expect(shorthand(tree)).to.equal(example.out)
			})
		})
	})
})
