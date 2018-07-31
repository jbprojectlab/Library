'use strict'

const { expect } = require('chai')

const compile = require('./compile')

describe('`compile`', () => {
	it('can convert a sandwich description to shorthand', () => {
		const description = 'ham and cheese and mustard on wheat'
		const shorthand = compile(description)
		expect(shorthand).to.equal('W(hcm)')
	})
})
