# Async Redux Action Creators

[![Travis](https://img.shields.io/travis/VinSpee/async-redux-actions.svg?style=flat-square)](https://travis-ci.org/VinSpee/async-redux-actions)
[![Coverage Status](https://coveralls.io/repos/github/VinSpee/async-redux-actions/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/VinSpee/async-redux-actions?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/async-redux-actions.svg?style=flat-square)](https://www.npmjs.com/package/async-redux-actions)
[![Tested with Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg?longCache=true&style=flat-square)](https://github.com/facebook/jest)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?longCache=true&style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?longCache=true&style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?longCache=true&style=flat-square)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?longCache=true&style=flat-square)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/VinSpee/async-redux-action-creators.svg?longCache=true&style=flat-square)](https://github.com/VinSpee/async-redux-actions/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/VinSpee/async-redux-actions.svg)](https://greenkeeper.io/)

```
({
  prefix: String,
  states: [...String]
}) => ({ entity: String }) => {
  ...[String]: ReduxAction
}
```

## install

`yarn add -D async-redux-actions redux-actions`

## What

async-redux-actions is a small helper that uses [redux-actions](https://redux-actions.js.org/) to create a set of action creators and action types that you can use for all of your app's actions. It helps you by taking an object of actions and returning a set of action creators and actions types.

## Why

I like using `redux-actions` in conjunction with [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware), but felt icky about writing things like `${userActions.signIn.toString()}/RECEIVED`.

## How

```js
// user.js

import createActions from 'async-redux-actions';

const actions = createActions({
  states: ['REQUESTED', 'RECEIVED', 'REJECTED'],
  prefix: '💎',
}); // returns an function that is waiting on an entity and an object of actions.

export default actions({ entity: 'user ' })({
  PROFILE: promiseApi.getProfile,
});
```

That will create these action creators and types:

### action creators

- `profile.requested()`
- `profile.received()`
- `profile.rejected()`
- `profile()`

along side of `redux-promise-middleware`, dispatching `profile` will kick off
each action according to it's state, just like normal.

### types

- `'💎/USER/PROFILE/REQUESTED'`,
- `'💎/USER/PROFILE/RECEIVED'`,
- `'💎/USER/PROFILE/REJECTED'`

here's a [full sample](https://codesandbox.io/s/r0r7wpjz1o)
