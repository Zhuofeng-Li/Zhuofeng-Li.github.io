---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git push:*), Bash(git diff:*), Bash(git branch:*), Bash(git log:*)
description: Quick commit and push changes to git repository
---

## Context

- Current git status: !`git status`
- Current git diff: !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`

## Your task

Based on the above git status and changes:

1. Add all modified and untracked files to staging area using `git add .`
2. Create a commit with message. If user provided arguments ($ARGUMENTS), use them as commit message. Otherwise, create an appropriate commit message based on the changes shown in git status and diff.
3. Push the changes to the remote repository using `git push`

Make sure to:

- Review the changes before committing
- Use clear and descriptive commit messages
- Handle any potential errors during the process
- Confirm successful push to remote

Commit message to use: $ARGUMENTS
