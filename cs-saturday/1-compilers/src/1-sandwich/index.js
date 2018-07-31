'use strict'

const inputStr = process.argv[2]
const compile = require('./compile')

// the only side effect in all of the solution code
console.log(compile(inputStr))
