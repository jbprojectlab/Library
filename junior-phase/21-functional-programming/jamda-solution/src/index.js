'use strict'
const R = require('ramda')

const using = (f = R) => {
    /**
     * Example of using Ramda / Jamda to express data computation as a pipeline
     * of composed functions. Take a look here, then implement the individual
     * functions in 01-jamda.js! Don't forget to `npm test`.
     */

    const sortDescendingByDate = f.sort(f.descend(f.prop('dateUpdated')))

    const removeDuplicatesById = f.uniqBy(f.prop('id'))

    const isInstructor = f.pipe(f.prop('role'), f.equals('instructor'))

    const isGte = f.flip(f.gte)

    const hasEnoughVaca = f.pipe(f.prop('vacationDays'), isGte(7))

    const takeFreeInstructors = f.filter(f.both(isInstructor, hasEnoughVaca))

    const summarizeOne = f.pick(['firstName', 'lastName', 'vacationDays'])

    const summarizeAll = f.map(summarizeOne)

    const listInstructorsWhoCanJoinRoadtrip = f.pipe(
        sortDescendingByDate,
        removeDuplicatesById,
        takeFreeInstructors,
        summarizeAll,
    )

    return {
        listInstructorsWhoCanJoinRoadtrip,
    }
}

module.exports = using
