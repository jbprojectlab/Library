'use strict'

// Read: `lex` is a function taking a String and returning an Array of Tokens
// (for our purposes, a Token is just an object with `.type` property)

// lex :: String -> [Token]
const lex = inputStr => {
	// Your job: implement this function
	if (!inputStr) return []
	return inputStr.split(' ').map(word => ({
		type: 'Word',
		value: word,
	}))
}

// This makes `lex` available to other JS files in Node
module.exports = {
	lex,
}
