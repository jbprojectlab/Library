# Teamwork: Work on a Task

For a given task with an existing GitHub team project, we recommend the following workflow:

1. **Anybody**: Make a GitHub issue for the task.
2. **Anybody**: Assign a pair (**Coder**) to work on the task.
3. **Coder**: Branch off of `master` (use `git checkout -b branch-name-here` to create a new branch - include the issue # in the branch name).
4. **Coder**: Continually edit and commit.
5. **Coder**: If any updates get made remotely to GitHub's master branch, locally switch to `master`, `git pull`, switch to your working branch, then `git merge master`. Fix conflicts.
6. **Coder**: Push the branch to origin whenever you want to: a) make / update a pull request; b) share the current code with others (e.g. when switching driver and navigator), or; c) save it more persistently (e.g. in case something goes wrong with your local storage).
7. **Coder**: When task is "complete", make a pull request (and reference the issue) on GitHub.
8. **Anybody**: Assign a person (**Reviewer**) not in the pair to code review the pull request.
9. **Reviewer**: Review the code:
   1. **Reviewer**: If you have no comments (*really you have none?*), go to #10. Otherwise...
   2. **Reviewer**: Make round of comments.
   3. **Coder**: Address round of comments, likely repeating steps #4-6. Pass back to **Reviewer** for #9.i
10. **Reviewer**: Merge the PR.
11. **Everybody**: switch to `master`, pull from origin.

## Follow-up

- ["Git Feature Branch Workflow"](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
- ["About Pull Request Reviews"](https://help.github.com/articles/about-pull-request-reviews/)
