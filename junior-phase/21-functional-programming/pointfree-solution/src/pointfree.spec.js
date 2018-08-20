'use strict'
/* eslint-disable no-unused-expressions */

const { join } = require('path')
const { readFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)
const { expect } = require('chai')

// functions you define in `./pointfree.js`
const {
    inc,
    negate,
    negateThenInc,
    doubleThenDec,
    circleArea,
    incAll,
    incThenNegateAll,
    takeTwoDoubles,
    sum,
    product,
    allTrue,
    isSpace,
    howManyPoints,
    rejectPoints,
    isAtLeast25,
    ageIsAtLeast25,
    isLicensed,
    canRentCarWithoutSurcharge,
    getTwoEligibleRenterNames,
} = require('./pointfree')

describe('Point-free', () => {
    const verboten = /(function(\s+\w*)?\s*\(|new\s+Function|eval\s*\(|=>)/g
    // This spec is to keep you honest / catch any accidental pointful funcs!
    // Don't use `function` / `=>` / `eval` / `new Function` and it'll pass.
    it('does not use manually-created functions, only derived', async () => {
        const sourceCode = await readFileAsync(
            join(__dirname, 'pointfree.js'),
            'utf-8',
        )
        const matches = sourceCode.match(verboten)
        if (matches) {
            throw Error(
                `Do not define functions from scratch. Found these: ${matches}`,
            )
        }
    })

    describe('`inc`', () => {
        it('adds 1', () => {
            expect(inc(4)).to.equal(5)
            expect(inc(0)).to.equal(1)
            expect(inc(7)).to.equal(8)
        })
    })

    describe('`negate`', () => {
        it('negates a number', () => {
            expect(negate(4)).to.equal(-4)
            expect(negate(0)).to.equal(0)
            expect(negate(-7)).to.equal(7)
        })
    })

    describe('`negateThenInc`', () => {
        it('negates and increments a number', () => {
            expect(negateThenInc(4)).to.equal(-3)
            expect(negateThenInc(0)).to.equal(1)
            expect(negateThenInc(-7)).to.equal(8)
        })
    })

    describe('`doubleThenDec`', () => {
        it('doubles and **DEC**rements a number', () => {
            expect(doubleThenDec(4)).to.equal(7)
            expect(doubleThenDec(0)).to.equal(-1)
            expect(doubleThenDec(-7)).to.equal(-15)
        })
    })

    describe('`circleArea`', () => {
        it('gets the area of a circle for a given radius', () => {
            expect(circleArea(0)).to.equal(0)
            expect(circleArea(1)).to.equal(Math.PI)
            expect(circleArea(3)).to.equal(9 * Math.PI)
        })
    })

    describe('`incAll`', () => {
        it('creates a new array of incremented values', () => {
            expect(incAll([1, 5, 0])).to.deep.equal([2, 6, 1])
            expect(incAll([-3, 9])).to.deep.equal([-2, 10])
        })
    })

    describe('`incThenNegateAll`', () => {
        it('increments and negates an bunch of numbers', () => {
            expect(incThenNegateAll([1, 5, 0])).to.deep.equal([-2, -6, -1])
            expect(incThenNegateAll([-3, 9])).to.deep.equal([2, -10])
        })
    })

    describe('`takeTwoDoubles`', () => {
        it('doubles a bunch of numbers and returns two of them', () => {
            expect(takeTwoDoubles([1, 2, 3, 4, 5])).to.deep.equal([2, 4])
            expect(takeTwoDoubles([0, 5, 19])).to.deep.equal([0, 10])
        })
    })

    describe('`sum`', () => {
        it('sums a list of numbers', () => {
            expect(sum([3, 3])).to.equal(6)
            expect(sum([1, 2, 3, 4])).to.deep.equal(10)
        })
    })

    describe('`product`', () => {
        it('gets the product of a list of numbers', () => {
            expect(product([3, 3])).to.equal(9)
            expect(product([1, 2, 3, 4])).to.deep.equal(24)
        })
    })

    describe('`allTrue`', () => {
        it('returns true if everything in the list is true', () => {
            expect(allTrue([false, true])).to.be.false
            expect(allTrue([true])).to.be.true
            expect(allTrue([true, true, true])).to.be.true
        })
    })

    describe('`isSpace`', () => {
        it('confirms if the passed-in string is a single space', () => {
            expect(isSpace('')).to.be.false
            expect(isSpace(' ')).to.be.true // <- this one
            expect(isSpace('X')).to.be.false
            expect(isSpace('  ')).to.be.false
            expect(isSpace('Hmmm')).to.be.false
        })
    })

    describe('`howManyPoints`', () => {
        it('reports the number of "point" strings in a list', () => {
            expect(howManyPoints(['hi', 'yo'])).to.equal(0) // point-free?
            expect(howManyPoints(['point', 'up'])).to.equal(1)
            expect(howManyPoints(['point', 'point', 'point'])).to.equal(3)
            expect(howManyPoints(['what', 'is', 'the', 'point'])).to.equal(1)
        })
    })

    describe('`rejectPoints`', () => {
        it('removes "point" strings from a list', () => {
            expect(rejectPoints(['hi', 'yo'])).to.deep.equal(['hi', 'yo'])
            expect(rejectPoints(['point', 'up'])).to.deep.equal(['up'])
            expect(rejectPoints(['point', 'point', 'point'])).to.deep.equal([])
            expect(rejectPoints(['what', 'is', 'the', 'point'])).to.deep.equal([
                'what',
                'is',
                'the',
            ])
        })
    })

    describe('`isAtLeast25`', () => {
        it('returns true for numbers greater than or equal to 25', () => {
            expect(isAtLeast25(24)).to.be.false
            expect(isAtLeast25(24 + Math.random())).to.be.false // 24.?????
            expect(isAtLeast25(25)).to.be.true
            expect(isAtLeast25(26)).to.be.true
        })
    })

    const TEMPLATE = { name: 'TEMPLATE', age: 0, status: 'N/A' }
    const Dana = { name: 'Dana', age: 25, status: 'licensed' }
    const Mark = { name: 'Mark', age: 34, status: 'revoked' }
    const Hans = { name: 'Hans', age: 21, status: 'licensed' }
    const Aiko = { name: 'Aiko', age: 40, status: 'licensed' }
    const John = { name: 'John', age: 33, status: 'licensed' }

    describe('`ageIsAtLeast25`', () => {
        it('returns true for people whose `age` is at least 25', () => {
            expect(ageIsAtLeast25(Dana)).to.be.true
            expect(ageIsAtLeast25(Hans)).to.be.false
            expect(ageIsAtLeast25(Aiko)).to.be.true
        })
    })

    describe('`isLicensed`', () => {
        it('returns true for people whose `status` is `licensed`', () => {
            expect(isLicensed(TEMPLATE)).to.be.false
            expect(isLicensed(Mark)).to.be.false
            expect(isLicensed(Aiko)).to.be.true
        })
    })

    describe('`canRentCarWithoutSurcharge`', () => {
        it('returns true for licensed people who are 25 or older', () => {
            expect(canRentCarWithoutSurcharge(TEMPLATE)).to.be.false
            expect(canRentCarWithoutSurcharge(Mark)).to.be.false
            expect(canRentCarWithoutSurcharge(Hans)).to.be.false
            expect(canRentCarWithoutSurcharge(Aiko)).to.be.true
        })
    })

    describe('`getTwoEligibleRenterNames`', () => {
        it('gets up to two people who can rent a car cheaply`', () => {
            expect(
                getTwoEligibleRenterNames([Dana, Mark, Hans, Aiko, John]),
            ).to.deep.equal(['Dana', 'Aiko'])
        })
    })
})
