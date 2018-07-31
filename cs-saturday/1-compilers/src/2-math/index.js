'use strict'

const { evaluate, compile } = require('./compile')

// checking command flags for backend choice
const inputStr = process.argv[2]
const evalFlag = process.argv[3] === 'eval'

// choose which function to use
const transform = evalFlag ? evaluate : compile

// the only side effect in all of the solution code
const main = string => console.log(transform(string))

// here we go…
main(inputStr)
