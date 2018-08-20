'use strict'

const { expect } = require('chai')
const R = require('ramda')
const J = require('./01-jamda')
const data = require('./data')
const using = require('./index')

describe('`listInstructorsWhoCanJoinRoadtrip` (in index)', () => {
    // this should pass already as it uses the real Ramda library
    describe('using Ramda', () => {
        it('gets the correct instructors in the proper format', () => {
            const result = using(R).listInstructorsWhoCanJoinRoadtrip(data)
            expect(result).to.deep.equal([
                { firstName: 'Tom', lastName: 'Kelly', vacationDays: 12 },
                { firstName: 'Cássio', lastName: 'Antonio', vacationDays: 8 },
            ])
        })
    })

    // this will only pass once you pass all the Jamda specs!
    describe('using Jamda', () => {
        it('gets the correct instructors in the proper format', () => {
            const result = using(J).listInstructorsWhoCanJoinRoadtrip(data)
            expect(result).to.deep.equal([
                { firstName: 'Tom', lastName: 'Kelly', vacationDays: 12 },
                { firstName: 'Cássio', lastName: 'Antonio', vacationDays: 8 },
            ])
        })
    })
})
