# JS Compiler Workshop

LL(1) recursive descent compiler exercise for education, in two parts:

1.  Compiling sandwich descriptions (as in, the kind you eat) to a shorthand
1.  Compiling infix arithmetic expressions to postfix (RPN)

It is possible to solve both using pure functions only (except for the final `console.log`). No side effects, no mutations, all `const`, etc.

## Installation

```sh
npm install # or just `npm i` or even `npm`
```

## Exercise

```sh
npm run test-watch # start all the tests in watch mode
```

Implement the specs found in the `src/1-sandwich` and `src/2-math` folders in order:

1.  Lexer
2.  Parser
3.  Generator

The `compile.spec.js` for that respective folder will then pass.

**Refer to the lecture notes and LearnDot guide / hints**. This exercise will be very opaque without the extra help!

# Sandwich Description Compiler

The first part (`/src/1-sandwich`) of this workshop demonstrates the core concepts in a relatively minimal way. The example is reading sandwich descriptions, parsing them into a tree, and then generating either the original output or an ad-hoc shorthand. The language is so simple that a much better solution would be vanilla string manipulation; lexing, parsing, and generating is done here solely for practice.

<details><summary>Click to Open</summary>

## Use

```sh
npm run test-sandwich # must pass
npm run start-sandwich 'ham and cheese on rye' # outputs R(hc)
npm run start-sandwich 'cheese and mustard and ham and cheese on wheat' # outputs W(cmhc)
```

## Contents

### Lexer

Converts raw input string to an array of Plain Old JavaScript Objects (POJOs) representing lexemes, aka tokens. For this language, all the tokens will be of type "Word".

### Parser

Converts array of tokens to a parse tree, aka concrete syntax tree. Here is a table of nonterminals in the grammar, with corresponding parse tree node types and expected properties:

| Nonterminal  | Parse Tree Node `type` | Required Tree Node Properties                     |
| ------------ | ---------------------- | ------------------------------------------------- |
| Sandwich     | `Sandwich`             | `childFilling`, `childMoreFillings`, `childBread` |
| Filling      | `Filling`              | `childLiteral`                                    |
| Bread        | `Bread`                | `childLiteral`                                    |
| MoreFillings | `Epsilon`              | —                                                 |
| MoreFillings | `MoreFillings`         | `childFilling`, `childMoreFillings`               |

Note that the last terminal (MoreFillings) has two possible options, one of which is nothing at all, and the other of which is recursive!

### Generator

Dispatches based on node type to recursively process the parse tree. Two generators are spec'd:

*   one which re-generates the input string
*   one which condenses the description to an invented shorthand

Only the shorthand converter is enabled via `npm run start-sandwich "ham on rye"` (yielding `R(h)`).

## Grammar

A grammar is the set of production rules for a language; that is, substitutions which eventually generate any valid string in the language. Our sandwich grammar, also listed in `docs/1-sandwich.grammar.ebnf`, is as follows (_note that this isn't quite complete as we have ignored whitespace in the interest of extreme minimalism_).

```
(* Note this pseudo-EBNF elides whitespace handling *)
Sandwich = Filling, MoreFillings, 'on', Bread;

Filling = 'ham'
        | 'cheese'
		| 'mustard'
        | ;

MoreFillings = 'and', Filling, MoreFillings
             | ; (* nothing, aka epsilon *)

Bread = 'rye'
      | 'wheat';
```

</details>

# JS Arithmetic Expression Compiler

One of the classic examples of compilation, as a small but rich set of mathematical expressions can be formally defined and require nontrivial parsing.

A CST / PT preserves all or almost all of the syntax as represented by the language's grammar, whereas an Abstract Syntax Tree (AST) reduces the information to the bare minimum necessary for a given use case. Our CST features one node type per _production rule_ rather than for per _nonterminal_, which increases the number of node types but simplifies the generator code. In fact, our generator can have zero `if` statements or ternaries, only control flow via `switch`.

<details><summary>Click to Open</summary>

## Use

```sh
npm test # passes
npm start '-9 * 2 / -(3 + 7) + ((-4 * 1/2) - -21)' # outputs RPN string
npm start '-9 * 2 / -(3 + 7) + ((-4 * 1/2) - -21)' eval # outputs num
```

### Supports

*   Integers
*   Negation
*   Addition
*   Subtraction
*   Multiplication
*   Division
*   Grouping (parens)

## Contents

### Lexer

Converts raw input string to an array of Plain Old JavaScript Objects (POJOs) representing lexemes, aka tokens:

*   Number (string of digits)
*   Lparen
*   Rparen
*   Star
*   Slash
*   Plus
*   Minus

### Parser

Converts array of tokens to a parse tree, aka concrete syntax tree. Organized by nonterminal category:

*   Expression (childTerm, childT2)
*   Term (childFactor, childF2)
*   T2 rules
    *   EpsilonT2
    *   AdditiveT2 (childTerm, childT2)
    *   SubtractiveT2 (childTerm, childT2)
*   Factor rules
    *   NumericF (childNumber)
    *   NegativeF (childFactor)
    *   GroupF (childExpression)
*   F2 rules
    *   EpsilonF2
    *   MultiplicativeF2 (childFactor, childF2)
    *   DivisionalF2 (childFactor, childF2)

Note that a CST / PT preserves all or almost all of the syntax as represented by the language's grammar, whereas an Abstract Syntax Tree (AST) reduces the information to the bare minimum necessary for a given use case. Our CST features one node type per _production rule_ rather than for per _nonterminal_, which increases the number of node types but simplifies the generator code.

### Generator

Dispatches based on node type to recursively process the parse tree. Several generators spec'd:

*   one which re-generates the input string
*   a numerical evaluator
*   an infix -> RPN compiler

The compiler is active by default. The evaluator can be chosen from the command line by appending the `--eval` flag.

## Grammar

A grammar is the set of production rules for a language; that is, substitutions which eventually generate any valid string in the language. A simple grammar for expressions (starting from E) is:

```
E -> (E)
E -> E + E
E -> E * E
E -> number
```

Unfortunately, while the above grammar is valid (producing sentences in the language), it is also ambiguous (could be represented by different parse trees, affecting the semantic meaning of the expression). The following is an unambiguous grammar:

```
E -> E + T
E -> T
T -> T ∗ F
T -> F
F -> (E)
F -> number
```

Unfortunately, this grammar is left-recursive, which makes it impossible to parse via LL recursive descent (one of the easiest parsers to implement). The following refactors the grammar to be parsed via an LL(1) algorithm:

```
E  ->   T T2
T2 -> + T T2
T2 -> ε
T  ->   F F2
F2 -> * F F2
F2 -> ε
F  -> (E)
F  -> number
```

A formal EBNF notation of a similar grammar is included in the `docs` folder, with the augmentation that we allow for division, subtraction, and negative factors.

It is possible to code the parse tree using nonterminals and terminals in the above grammar as node types. However, that necessitates that a given node type (e.g. F) might be polymorphic (have more than one shape). An alternative, which works in any language, is to have a separate node type per production rule (arrow) as discussed earlier.

</details>

## Resources

*   [Stanford CS143 Notes on Parsing (PDF)](https://web.stanford.edu/class/archive/cs/cs143/cs143.1156/handouts/parsing.pdf)
*   [Online RPN <-> Infix Compiler / Evaluator](http://rpnevaluator.andreasandersen.dk/default.aspx) (useful for double-checking)
