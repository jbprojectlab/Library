## using the dev tools debugger

`debugger` allows us to "pause" a program. In that paused state, we can view all the variables' (in scope) state. We can also "step one line forward" or "unpause".

## editor config in VSCode vs. prettier

Prettier is an autoformatter: it'll convert your code to be styled in a certain way.

Editor config in VS code: specify defaults / expected structure. For example, tabs vs spaces. What do certain keys do?

## git branch and merge (with conflict)

We started with...

```
**Trees are upside down**
```

And [committed](https://github.com/FullstackAcademy/1807-FSA-RM-Library/commit/8259aff916a94575f5137eb4ad3b5705cd48b051) to `master`. Then made a new branch `cows` and changed the text to:

```
**Cows are upside down**
```

And [committed](https://github.com/FullstackAcademy/1807-FSA-RM-Library/commit/95e11576e50ab2e6193531b1b2a962155f517693) it to `cows`. Then we went back to `master`, made a new branch `odie` and changed the text to:

```
**Odie is upside down**
```

And [committed](https://github.com/FullstackAcademy/1807-FSA-RM-Library/commit/3997a34adb00f1d5c0bd8d0d196deff148bcc664) to `odie`. Then we went back to `master`, merged `cows`, which caused master to have the text (no conflicts):

```
**Cows are upside down**
```

Then (from `master`) we merged in `odie`, which caused the text to become (conflict):

```
<<<<<<< HEAD
**Cows are upside down**
=======
**Odie is upside down**
>>>>>>> odie
```

At which point, we chose to edit the text to:

```
**Cows and Odie are upside down**
```

Then [committed](https://github.com/FullstackAcademy/1807-FSA-RM-Library/commit/42d5dd0ede373a4a2edfcc84ff9ccce80ab0b593) to `master`.

Merge + conflict done.

By the way, if we go back to `cows` the text is still:

```
**Cows are upside down**
```

And if we go back to `odie` the text is still:

```
**Odie is upside down**
```

...because when we `merge` it is "one way". That is, here we only merged *into* `master`.

## being able to commit certain parts of a file

~Not as far as I know.~

Follow-up: yes! When `add`ing you can use the `--patch` flag with a filename and it'll open an interactive prompt where you can add certain parts of a file. [See here](https://stackoverflow.com/a/1085191/1470694).
