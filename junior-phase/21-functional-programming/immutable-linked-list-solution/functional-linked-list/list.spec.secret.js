'use strict'

const ListNode = require('./list')

/**
 * SECRET! 🤫
 *
 * This file contains a Chai helper plugin to make checking and debugging your
 * immutable linked lists easier.
 *
 * Part of the plugin's code reveals approaches you could use in solving a few
 * of the specs. Therefore, we do not recommend you read this file while trying
 * to solve the exercise.
 *
 * Later, feel free to come back here and take a look around.
 *
 * SPOILERS BELOW
 *
 * ⚠️ ⚠️ ⚠️
 */

module.exports = chai => {
    const { Assertion } = chai
    Assertion.overwriteProperty(
        'null',
        _super =>
            function checkList() {
                const actList = this._obj
                if (actList && actList instanceof ListNode) {
                    this.assert(
                        actList === null,
                        `expected null but got a list with ids ${short(
                            actList
                        )}`,
                        `did not expect a null list but got null`,
                        '[] (that is, null)',
                        stringify(actList),
                        true
                    )
                } else {
                    _super.call(this)
                }
            }
    )
    Assertion.overwriteMethod(
        'equal',
        _super =>
            function assertEqual(expList) {
                const actList = this._obj
                const actListIsNode = actList instanceof ListNode
                const expListIsNode = expList instanceof ListNode
                if (
                    (expList === null && actListIsNode) ||
                    (expListIsNode && verifyShape(expList)) ||
                    (actListIsNode && verifyShape(actList))
                ) {
                    const diffs = getDiffs(expList, actList)
                    const actListMed = formatEqs(actList, diffs)
                    const expListMed = formatEqs(expList, diffs, true)
                    this.assert(
                        actList === expList,
                        `expected a list with ids ${short(
                            expList
                        )} but got ${short(actList)}, references ${asList(
                            diffs
                        )}`,
                        `expected a different list from ${short(
                            expList
                        )} but got the same list in memory (===)`,
                        expListMed,
                        actListMed,
                        true
                    )
                } else {
                    _super.apply(this, arguments)
                }
            }
    )
}

function verifyShape (node) {
    return node.id && node.value && node.hasOwnProperty('next')
}

function asList(items) {
    return `[${items.join(', ')}]`
}

function listIds(list) {
    return list ? [list.id, ...listIds(list.next)] : []
}

function withEq(list, diffs, useEq = false) {
    return listIds(list).reduce((results, id, i) => {
        return [...results, `${id} & (${useEq ? '===' : diffs[i]})`]
    }, [])
}

function formatEqs(list, diffs, useEq = false) {
    return asList(withEq(list, diffs, useEq))
}

function stringify(list) {
    return list ? asList(listIds(list)) : '[] (that is, null)'
}

function shortItem(item) {
    return item.slice(0, 4) + '…'
}

function short(list) {
    return list ? asList(listIds(list).map(shortItem)) : '[] (null)'
}

function getDiffs(list1, list2) {
    let current1 = list1,
        current2 = list2
    const results = []
    while (current1 || current2) {
        results.push(current1 === current2 ? '===' : '!==')
        current1 = current1 && current1.next
        current2 = current2 && current2.next
    }
    return results
}
