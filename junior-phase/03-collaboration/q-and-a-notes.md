## using the dev tools debugger

`debugger` allows us to "pause" a program. In that paused state, we can view all the variables' (in scope) state. We can also "step one line forward" or "unpause".

## editor config in VSCode vs. prettier

Prettier is an autoformatter: it'll convert your code to be styled in a certain way.

Editor config in VS code: specify defaults / expected structure. For example, tabs vs spaces. What do certain keys do?

## git branch and merge (with conflict)

We started with...

**Trees are upside down**

And committed to `master`. Then made a new branch `cows` and changed the text to:

**Cows are upside down**

And committed it to `cows`. Then we went back to `master`, made a new branch `odie` and changed the text to:

**Odie is upside down**

And committed to `odie`. Then we went back to `master`, merged `cows`, which caused master to have the text (no conflicts):

**Cows are upside down**

Then (from `master`) we merged in `odie`, which caused the text to become (conflict):

<<<<<<< HEAD
**Cows are upside down**
=======
**Odie is upside down**
>>>>>>> odie

At which point, we chose to edit the text to:

**Cows and Odie are upside down**

Then commited to `master`.

Merge + conflict done.

By the way, if we go back to `cows` the text is still:

**Cows are upside down**

And if we go back to `odie` the text is still:

**Odie is upside down**

...because when we `merge` it is "one way". That is, here we only merged *into* `master`.

## being able to commit certain parts of a file

Not as far as I know.
