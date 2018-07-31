'use strict'
/* eslint-disable no-unused-expressions */

const chai = require('chai')
const { expect } = chai

const { lex } = require('./1-lexer')

describe('lexer `lex`', () => {
	it(`converts '' to an array of no tokens`, () => {
		expect(lex('')).to.be.empty
	})

	it(`converts 'ham' to an array of one Word token`, () => {
		const tokens = lex('ham')
		expect(tokens).to.deep.equal([
			{
				type: 'Word',
				value: 'ham',
			},
		])
	})

	it(`converts 'ham and cheese on rye' to an array of five Word tokens`, () => {
		const tokens = lex('ham and cheese on rye')
		expect(tokens).to.deep.equal([
			{
				type: 'Word',
				value: 'ham',
			},
			{
				type: 'Word',
				value: 'and',
			},
			{
				type: 'Word',
				value: 'cheese',
			},
			{
				type: 'Word',
				value: 'on',
			},
			{
				type: 'Word',
				value: 'rye',
			},
		])
	})
})
