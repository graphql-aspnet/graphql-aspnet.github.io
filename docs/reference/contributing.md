---
id: contributing
title: Contributing
sidebar_label: Contributing
---

_Last Updated_: Oct. 24th 2019

> Thank You, Thank You, Thank You!!

If you're reading this hopefully you are interested in contributing. We'll always take any PRs to fix bugs, code comments, descriptions or other minor changes at anytime. If you'd like to tackle something bigger that's great too! Be sure to keep up on the active issues and milestone targets for the project so you aren't accidentally working on something slatted for removal or being wrapped up by someone else.

## We're Here to Help!!!
The team at GraphQL ASP.NET is education focused. Our backgrounds come from education technology and adult learning. If you want to contribute but don't know where to start reach out to us on github. We can help guide you on active issues of any skill level; be it adding more unit tests to increase the library's code coverage, updating or appending to the documentation or tackling big structural changes with the query pipeline. We welcome everyone!

## Project Organization and Branching

> GraphQL ASP.NET uses the **GitFlow** strategy for branch management.

[GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) - An introduction to the GitFlow workflow.

The following branches are protected and require a PR to merge into:

-   `develop` : The primary development branch.
-   `master` : the main production branch. 
    -   This branch always represents the most current release to [nuget.org](https://www.nuget.org/).
-   `release/*`: any branch prefixed with release indicates an upcoming, but not finalized, release. 
    -   These branches are published to nuget with `-preview` suffix.
    -   Note: These branches will not appear until after the v1.0 release. Until then the master branch will represent the most current preview release.

## Creating a Feature Branch

All working branches should start with `feature/` or `bug/` depending on what work is being completed. 99% of the time you'll want to branch off of `develop` which is the protected branch containing the version being actively coded. Sometimes, after a code freeze, a branch may need to be taken from a release branch (e.g. `release/1.0.3`) if there is a last minute bug fix that needs to make it in to the build. 

When naming your branch try and be short but descriptive. Including the issue number is helpful, especially on bugs, but not required as your PR should mention the bugs/issues being addressed by your code changes.

Good Branch Names:
* `feature/websocketSupport`
* `bug/fragmentParsing-1234`
* `bug/specRule_6.4.3`

Bad Branch names:
* `thatCodeYouAskedFor`
* `feature/moreUnitTests`
* `feature/bobSmith`

## Submitting a PR

When submitting a PR please include the following information. If you create a PR through github directly, a template will be automatically loaded an example.

-   A descriptive title.
-   Links to any issues the PR relates to.
    -   Issues can be quickly linked to using the `#` symbol along with the issue number (e.g. `#1321`).
-   An organized description of the work completed. This could be a set of bullet points, a few sentences or a few pages of information. Use your best judgement based on the PR you are submitting. A reviewer will ask for additional info if its needed.   

Once submitted your PR will go through the following stages:
* The PR will be assigned one or more team members as reviewers and yourself as the "assignee".
* A reviewer will perform a spot check review and approve the PR for CI by commenting in the PR. This will initiate a set of gated checks that look for in-code documentation, linting issues, file formatting etc. as well as running the unit test suite. Please fix any issues that arise.
* Once CI passes a more detailed review will be done by a team member. They may offer feedback or request changes.
* After final approval is given your PR will be merged into the target branch and your branch will be deleted.

## Stale Branches and Pruning

In an effort to keep the repository clean and uncluttered the team will periodically clean out the branches in github. This is a manual process at the team's discretion. As a rule of thumb, any branches that have not had any commits in over 21 days may be removed. You are always welcome to resubmit the branch from your local repo at any time.

> Any unprotected branches that have not had a commit in more than 21 days and do not currently have an open PR will be removed.


Happy coding!