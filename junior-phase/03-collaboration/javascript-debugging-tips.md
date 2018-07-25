# Debugging JavaScript Applications

### A practical distillation for Fullstack Academy students

Faults in computer problems were theorized as far back as 1843, when Ada Lovelace noted of Babbage's Analytical Engine, "Granted that the actual mechanism is unerring in its processes, the *cards* may give it wrong orders." Almost 160 years later, NIST reported that software errors cost the US [$59 billion annually]((http://bit.ly/2k2z8he)). Clearly, some of the cards are wrong. However, unlike Grace Hopper's famous [moth](https://upload.wikimedia.org/wikipedia/commons/8/8a/H96566k.jpg), most of the time the culprit is ourselves.

Debugging is a sanitization procedure consisting of:

* Preventing bugs in the first place, through good practices and assistive tooling.
* Detecting bugs when they first arise, through proper error handling and testing.
* Diagnosing and locating bugs, through the scientific method and interactive tooling.
* Treating bugs, through reasoned analysis and patient refactoring.
* Reinforcing code health, through additional testing and reflection.

The heroic `console.log` may be your first line of defense, but it need not be your last. Anyone can improve their debugging skills, with great payoff. Studies show a 20:1 difference in time to debug between experienced and inexperienced developers, also leaving (and creating!) far fewer bugs in the process (McConnell, *Code Complete*).

-------------------------------------

## 1. Prevention

> "An ounce of prevention is worth a pound of cure."

### Assistive Tooling

Automated help is free and will save you many times. Not using it is basically selecting "hard" difficulty on the start screen of your career.

* Linters
  * Like a guardian angel
  * [ESLint](http://eslint.org/) is a modern, configurable, well-designed linter for JS
  * [eslint-config-fullstack](https://github.com/fullstackacademy/eslint-config-fullstack) is designed to aid students in error prevention and learning best practices
  * Integrate ESLint into your editor of choice (see the Toolbox workshop)
* Autoformatters
  * Reveal the true structure of your code, not what you *think* is the structure
  * [Prettier](http://prettier.io)
  * Get an [extension for your editor](https://prettier.io/docs/en/editors.html)
* Git
  * Make *frequent*, *small* commits
  * Commit only related changes (did you know you can commit just some files / lines?)
  * Final (pushed) commits should contain only *working code* (to your knowledge)
  * Make commits before moving on (e.g. refactoring)
  * Learn [SEMVER](http://semver.org/) and what major.minor.patch means. Then realize that it guarantees nothing.
* [husky 🐶](https://github.com/typicode/husky)
  * Lets you register git hooks which can run your testing suite before a `commit` or `push` or similar
* Continuous Integration
  * Examples: [Codeship](https://codeship.com/), [Travis](https://travis-ci.org/)
  * Can integrate with GitHub and automatically run test suite for branches / PRs

### Good Practices & Style

> "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." —Brian W. Kernighan

Code style is not just about opinionated aesthetics. It is about reducing complexity, improving maintainability, and consequently eliminating the *potential* for bugs. Thousand-page books have been written on this subject, but here are some tips that will keep many bugs away.

* Functions are fun
  * Use *small* functions. Try imposing an arbitrary limit (10 lines is plenty).
  * Prefer *pure* functions. Pure functions neither rely on nor influence the surrounding scope. They take in inputs and return outputs — nothing more. That makes them easy to reason about (stateless).
  * Prefer *single-purpose* functions. If your function does two things, maybe it should be two functions.
  * Prefer *deterministic* functions. Indeterminism is hard to test, reproduce, check, and reason about.
* KISS (Keep It Simple, Stupid)
  * Check out [Rob Pike's 5 Rules of Programming](http://users.ece.utexas.edu/~adnan/pike.html)
  * Readability > smallness
  * Simple > clever
* Formatting matters!
  * Conciseness comes from economy of logic, not economy of lines
  * Whitespace improves clarity
  * Lines rarely need to be very long; set a 100 column ruler in your editor as a guide
  * Use clear variable names; `flavor` > `flvr` >>> `f`
  * Avoid ambiguous / similar variables; [`current` and `total`] >>> [`numi` and `numt`]
  * Indent your code properly / consistently. Indentation reveals structure.
* State is icky.
  * The biggest mental tax on a programmer is keeping track of state
  * It is very hard to keep state in sync across an application
  * Reduce and remove state whenever it won't result in a big increase in complexity
  * Prefer `const` to `let`. Prefer `let` to `var`. Put variables in the smallest scope possible.
* Don't copy-paste from others
  * Make sure you understand exactly what a code snippet does before using it
  * You never know when online text will include weird formatting characters, like the invisible [zero-width space](https://en.wikipedia.org/wiki/Zero-width_space)
* Do copy-paste from yourself
  * If you wrote something useful, put it in a gist, reuse it in other projects
  * Another upside to small single-purpose pure deterministic functions!
* Know thyself
  * Keep track of your own mistakes, and learn from them

-------------------------------------

## 2. Detection

Discovering a bug usually occurs because of any of the following:

* Automated testing fails
* Impossible to compile / transpile / launch / load
* Program crashes or stops behaving as expected while developing
* Program crashes or stops behaving as expected for user

Woe is the developer who discovers a bug and has no idea when it was introduced. It could be *anywhere*. Immediate, obvious feedback makes it far easier to track down… and means fewer irate customers.

### Automated Testing

It is difficult to overstate the tremendous value of automated testing in general. You will learn more about automated tests in a few weeks, but keep an open eye for some of the benfits it can bring:
* Help structure your approach (TDD)
* Confirm code works as expected (TDD)
* Prevent *regressions* (working code breaking in the future)!

Besides all that, running the test suite is an easy, painless way to check all is well.

-------------------------------------

## 3. Diagnosis

Diagnosis is detective work, scientific experiment, hunting, and research all combined. Chances are, if you were looking for debugging tips, this is the section you were interested in. But as you can see, there is a ton you can do about bugs before we even get to debugging proper. Take prevention and detection seriously.

### Mandatory

* Your client console (e.g. Chrome console) should be open. Any errors?
* Your server console (e.g. iTerm) should be open. Any errors?
* Any other relevant logs / processes should be visible. Any errors?

### Psychology and Approach

* People see what they want to to see. Stop *reading* your code and start *dissecting* it.
  * Example: did you know there are two "to"s in in a row in the above line?
  * And two "in"s in the previous line?
* Stop assuming. "Be the machine." Take things piece by piece and *test assumptions*.
* Use your head. Don't just try random stuff, *think*. Form and test hypotheses.
* Check easy & fast stuff first, even if it's unlikely.
* Consult documentation and other resources.
* Get more eyes on the code. Different perspectives help.
* Use "rubber duck" (aka "confessional") debugging: explain your problem carefully, step-by-step, to someone else. In the process you will often realize your mistake.
* Assume the error is your fault! It almost always is.
  * But ok, check the GitHub issues if you're convinced it's the library
* Be suspicious of recently-changes & often-buggy sections of code
* Give yourself a break. Take a walk. Come back to the problem with fresh eyes.

### Reproduce the Bug

Before you can even think of identifying the cause of your problem, make sure you know what the problem even is.

* Can you reproduce the bug at will?
* Does the bug occur in other circumstances / situations?
* Can you describe the bug clearly to a stranger?
  * "The cart doesn't work" is meaningless. "When I click on this button, it adds two items instead of one" is useful.

### Sanity Checks

Sometimes the problem is "stupid", yet you can burn a lot of time chasing it down. Some easy things to check, which can make a big difference:

* is the server actually running?
* is the server _restarting_? Or have you restarted it?
* is this the right file?
  * are you _suuuure_? Really, try adding a `console.log` to the very top.
* is it saved?
* is your build process working?

### Post-Mortem Debugging

When your app crashes, all is not lost. If it gasped out a stack trace with its dying breath, you may have all you need to track down the problem.

* Read the error message, but for *clues*, not gospel
  * Error messages are sometimes just string labels a developer wrote. They may be misleading or badly worded, and may have nothing to do with the root cause of the error.
  * Think about what the error is saying, and how it might apply to your code… and might not
  * Google unfamiliar error messages if necessary
  * Read the *whole* message. For example, npm errors always append a boilerplate warning on the bottom. If you haven't scrolled up to read the *actual* error message, you are missing the important part.
* Read the stack trace!
  * Ignore the traces from library code. 99.9% of the time, the fault is yours, not the library.
  * Note your own functions in the trace
  * Go to the line number(s) and column(s) identified
  * If you are lucky, the error will be evident, or at least local
  * If you aren't lucky, the line & column will be irrelevant. Let it go.

### Proper Logging

* Spray 'n' pray (`console.log` everywhere) is better than nothing at all, but still among the most primitive forms of debugging.
* Annotate your `console.log`s with descriptive, searchable, visible strings.
  * `console.log('======== FOO:, foo)` >>> `console.log(foo)`
* Don't concatenate; use commas. `console.log('foo:', foo, 'bar', bar)` will pretty-print the `foo` and `bar` values (interactively in Chrome), which is better than seeing their stringified form.
* Do not commit `console` or `debugger` statements to code. Debug code is a temporary measure and pollutes the runtime standard output.


### Interactive Debugging

Relying solely on tons of `console.log` statements is like sprinting through a crime scene snapping a couple photos, and then trying to deduce what happened back in the dark room. It's much better to walk around at your leisure, looking and thinking carefully as you go. Interactive debuggers let you control program execution and investigate every detail.

* Use the `debugger;` statement.
* Learn the [Chrome dev tools](http://bit.ly/2k498lH)
  * The debugger
    * Normal and conditional (right-click) break-points
    * Stepping over, into, and out of functions
    * scoped variables and watch expressions
    * call stack
  * [The extended Console API](http://bit.ly/2iEP7pv)
    * Filterable log levels: `log` === `debug`, `info`, `warn`, `error`
    * Organization: `group`, `groupEnd`
    * Data: `table`, `dir`
    * Testing: `assert`
* You will learn about node in a few days. [Node has a debugger too](https://nodejs.org/api/debugger.html)
  * Built-in debugging client
    * `node debug yourFile.js` starts an interactive debugging session
    * `node --debug yourFile.js` launches the process in debug mode so other programs can investigate. Unlikely you'll use this.
    * `node --inspect yourFile.js` is an experimental feature which lets you debug Node from Chrome!
* [VSC debugger](https://code.visualstudio.com/Docs/editor/debugging) (uses Node debugger)
  * click the debug panel and create a `launch.json`
    * VSC is pretty good about configuring `launch.json` automatically for Node, but you will probably have to tweak the start file

### Narrowing Down

* How far do we get?
  * Log or step through each nested level down
  * Confirm the right route is being hit
  * Break dense statements into many small statements
* Apply binary search (aka the "Wolf Fence" algorithm)
  * Comment out half the suspicious code
  * Problem unchanged? It's not in the commented section.
  * Comment out half the remaining suspicious code
  * Repeat until the problem is found logarithmically
* Use *temporal* binary search with [`git bisect`](http://bit.ly/2k4hGZN)
* Use `git diff` (or view diff on GitHub) for more insight

### Nondeterminism

* Intermittent, semi-random errors are usually due to nondeterministic code. Be extra-careful with certain patterns.
  * Async anything
  * Random / seeded elements
  * Initialization
  * Race conditions
  * Complex state (bad syncing of data across app)
  * State based on external factors (API, etc.)
* Use mock objects / methods to force a predictable testing scenario.

### Voodoo

Try not to rely on poorly-understood ritual debugging actions; consider them a last resort.

* ["Have you tried turning it off and on again?"](https://www.youtube.com/watch?v=nn2FB1P_Mn8)
* `rm -rf node_modules && npm install`
* Still seek understanding even if works

-------------------------------------

## 4. Treatment

Finding the bug is most of the work. But fixing it can still be done well or poorly.

* STOP. Do not just blindly change values to see if it works. You can "fix" a bug by canceling it out with another bug, which is even worse than the first one. And you learn nothing.
  * By the same token, do not "patch" bad behavior with exceptional cases. You've solved nothing, and added technical debt to your app.
* Understand the code in its larger / deeper context.
* Figure out what *should* be the fix, based on your understanding.
* Implement by changing one thing at a time. Work incrementally, in small pieces.
* Confirm the fix with several different tests.
* Run your automated testing suite.
* Once you have apparently implemented the fix… `git commit`!
* RESIST THE URGE to refactor immediately after the fix. COMMIT FIRST!

-------------------------------------

## 5. Reinforcement

With the fault found and fixed, now is the time to follow through and make this bug hunt worthwhile.

* Perform some sanity checks on the new codebase. Think through the logic.
* *After* committing the fix, refactor the code if it is warranted.
* Add a new unit test to your suite guarding against incorrect behavior. Confirm your test works by breaking the code again (temporarily).
* Consider other locations where you may have made the same mistake. Investigate.
* Enjoy your healthy codebase!

-------------------------------------

# Resources

* McConnell, *Code Complete* 2nd ed.
