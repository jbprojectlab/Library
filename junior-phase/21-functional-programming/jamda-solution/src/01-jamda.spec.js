'use strict'
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const J = require('./01-jamda')

const id = a => a

describe('Jamda', () => {
    describe('`prop`', () => {
        it('retrieves a property from an object', () => {
            const obj = { color: 'blue', length: 17 }
            const length = J.prop('length', obj)
            const color = J.prop('color', obj)
            expect(length).to.equal(17)
            expect(color).to.equal('blue')
        })
    })

    describe('`equals`', () => {
        it('tests if two items are equal', () => {
            expect(J.equals(3, 4)).to.be.false
            expect(J.equals(3, 3)).to.be.true
            expect(J.equals('hi', 4)).to.be.false
            expect(J.equals('hi', 'hi')).to.be.true
        })
    })

    describe('`gte`', () => {
        it('tests if the first arg is greater or equal to second arg', () => {
            expect(J.gte(2, 3)).to.be.false
            expect(J.gte(3, 1)).to.be.true
            expect(J.gte(3, 3)).to.be.true
        })
    })

    describe('`both`', () => {
        it('tests if both input functions return true for a final argument', () => {
            const isOdd = x => x % 2 !== 0
            const isPos = x => x >= 0
            expect(J.both(isOdd, isPos, 5)).to.be.true
            expect(J.both(isOdd, isPos, 0)).to.be.false
            expect(J.both(isOdd, isPos, 1)).to.be.true
            expect(J.both(isOdd, isPos, 4)).to.be.false
            expect(J.both(isOdd, isPos, -1)).to.be.false
            expect(J.both(isOdd, isPos, -5)).to.be.false
        })
    })

    describe('`flip`', () => {
        it('takes a function and two arguments, and calls the function with the arguments in reverse order', () => {
            const append = (str1, str2) => str1 + str2
            expect(J.flip(append, 'Wow.', '...')).to.equal('...Wow.')
            expect(J.flip(append, ')', '(')).to.equal('()')
            const divide = (a, b) => a / b
            expect(J.flip(divide, 2, 1)).to.equal(0.5)
            expect(J.flip(divide, 4, 16)).to.equal(4)
        })
    })

    describe('`map`', () => {
        it('maps arrays by the passed-in mapper func', () => {
            const baseArr = [1, 2, 3]
            const double = x => x * 2
            const yell = s => s + '!'
            expect(J.map(double, baseArr)).to.deep.equal([2, 4, 6])
            expect(J.map(yell, baseArr)).to.deep.equal(['1!', '2!', '3!'])
            // don't modify the original array!
            expect(J.map(id, baseArr)).not.to.equal(baseArr)
        })
    })

    describe('`filter`', () => {
        it('filters arrays by the passed-in predicate func', () => {
            const baseArr = [1, 2, 3]
            const isOdd = x => x % 2 !== 0
            const isBig = x => x > 2
            expect(J.filter(isOdd, baseArr)).to.deep.equal([1, 3])
            expect(J.filter(isBig, baseArr)).to.deep.equal([3])
            // don't modify the original array!
            expect(J.filter(id, baseArr)).not.to.equal(baseArr)
        })
    })

    describe('`sort`', () => {
        it('creates a copy of an array, sorted by the passed-in comparator function', () => {
            const arr = [54, 213, 8, 1]
            const byFirstLetter = (a, b) => {
                const a0 = a.toString()[0]
                const b0 = b.toString()[0]
                if (a0 === b0) return 0
                else if (a0 > b0) return 1
                return -1
            }
            const byNumber = (a, b) => {
                if (a === b) return 0
                else if (a > b) return 1
                return -1
            }
            expect(J.sort(byFirstLetter, arr)).to.deep.equal([1, 213, 54, 8])
            expect(J.sort(byNumber, arr)).to.deep.equal([1, 8, 54, 213])
            // don't modify the original array!
            expect(J.sort(byFirstLetter, arr)).not.to.equal(arr)
        })
    })

    describe('`descend`', () => {
        it('builds a comparator function (returning -1, 0, or 1) which uses `<` on the results of a passed-in func', () => {
            const stone1 = { name: 'basalt', age: 913 }
            const stone2 = { name: 'pumice', age: 328 }
            const stone3 = { name: 'basalt', age: 328 }
            // name comparator
            expect(J.descend(s => s.name, stone1, stone2)).to.equal(1)
            expect(J.descend(s => s.name, stone2, stone3)).to.equal(-1)
            expect(J.descend(s => s.name, stone1, stone3)).to.equal(0)
            // age comparator
            expect(J.descend(s => s.age, stone1, stone2)).to.equal(-1)
            expect(J.descend(s => s.age, stone2, stone3)).to.equal(0)
            expect(J.descend(s => s.age, stone3, stone1)).to.equal(1)
        })
    })

    describe('`pick`', () => {
        it('copies objects only including specified properties', () => {
            const baseObj = {
                age: 99,
                type: null,
                name: 'Hemlock',
                alive: true,
            }
            const tree1 = J.pick(['age', 'alive'], baseObj)
            expect(tree1).to.deep.equal({
                age: 99,
                alive: true,
            })
            const tree2 = J.pick(['name'], baseObj)
            expect(tree2).to.deep.equal({
                name: 'Hemlock',
            })
        })
    })

    describe('`uniqBy`', () => {
        it('creates arrays only including the first occurrences of elements for which the passed-in matcher func returns unique values', () => {
            const greetings = ['hello', 'hi', 'yo', 'sup', 'heyo', 'salut']
            const firstLetter = s => s[0]
            const length = s => s.length
            expect(J.uniqBy(firstLetter, greetings)).to.deep.equal([
                'hello',
                'yo',
                'sup',
            ])
            expect(J.uniqBy(length, greetings)).to.deep.equal([
                'hello',
                'hi',
                'sup',
                'heyo',
            ])
        })
    })

    describe('`pipe`', () => {
        it('composes functions left-to-right', () => {
            const concatWithSpace = (...strings) => strings.join(' ')
            const toUpper = s => s.toUpperCase()
            const yell = s => s + '!'
            const resume = s => '...' + s
            const resumeShoutingSomeWords = J.pipe(
                concatWithSpace, // first func can take any number of args
                resume, // all other funcs are unary
                toUpper,
                yell,
                yell,
                yell,
            )
            expect(resumeShoutingSomeWords('well', 'done')).to.equal(
                '...WELL DONE!!!',
            )
            expect(resumeShoutingSomeWords('the', 'pipe', 'works')).to.equal(
                '...THE PIPE WORKS!!!',
            )
        })
    })
})
