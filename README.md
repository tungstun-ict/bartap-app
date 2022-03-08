# Bartap app

This project is a React native based application supposed to help bartenders keep track of the drinks that they sell to customers. It will be capable of the following:

- Managing drinks and their prices
- Managing customers and their bills
- Managing the payments off the customers to the bartender
- ... and more

Possibly will be capable of:

- Logging in with different roles
- See insight information about your bill (customer)
- See which drinks need to be restocked

## Table of Contents

- [Release](#Release)
- [Tools](#Tools)
- [Git Strategy](#Git-Strategy)
- [Scrum](#Scrum)
- [Contributing](#Contributing)
  - [Coding Standars](#Coding-Standards)
  - [Git](#Git)
    - [Commits](#Commits)
    - [History](#History)
    - [Feature Branches](#Feature-Branches)
    - [Pull Requests](#Pull-Requests)

## Release

We are working on an iOS release.

Newest release: 1.1.3

- Payment status can be tracked via the app.
- NFC tags can be connected to a customer profile.
- Every list is sorted alphabetical or via ID order.
- When adding a drink you can now select an amount.

## Tools

This project is made with [React Native](https://reactnative.dev/).
It allowes us to create a single application that can be deployed for web, Android and iOS at once.

## Git Strategy

For our git strategy, we are using a modified version of git flow. In our strategy we use the following branches:

- `Master branch`
- `Development branch`
- `Feature branches`

Whatever is in the master branch, will be running on the latest [build](#Release). The only things that will go in the master branch are releases, accompanied by `git tag` tags (v1, v2, etc.).

All of the development work will be done in the `development` branch. This is to ensure that the deployed version (`master` branch) will always remain stable.

For every story or (sub)task we create a new `feature` branch, each team member can do whatever he wants in this branch (rebasing, force pushing, all of it). These `feature` branches will be used to make Pull Requests in Github. In these PR's there will be regular reviews to ensure high code quality.

### Git

#### Commits

To keep your commits clean, we follow the advice given in this [article](https://chris.beams.io/posts/git-commit/).

#### History

To keep the Git history as clean as possible we do not allow merging between feature brances. Instead we use `git rebase` for this. All merging is to be done from Github.

#### Feature Branches

For every issue on the [project board](https://github.com/JortWillemsen/bar-application/projects/1) you can create a branch. This branch must follow the feature branch naming convention like this:

`feature/{isssue code}-a-small-description`

This makes sure that we can always discern branches from eachother. For example:

`feature/22-topbar-menu-implementation`

#### Pull requests

After you have finished an issue and the feature branch is ready to be merged with development you create a new pull request by going to:

`Github` -> `bartap-app` -> `Pull requests` -> `Compare and create new pull request`

In your last commit you must say to Github that the issue is done and it may close it. You can do this by typing:
`Closes #{feature id}` inside your commit message. Example:

`Closes #22`
