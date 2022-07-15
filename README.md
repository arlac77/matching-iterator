[![npm](https://img.shields.io/npm/v/matching-iterator.svg)](https://www.npmjs.com/package/matching-iterator)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Open Bundle](https://bundlejs.com/badge-light.svg)](https://bundlejs.com/?q=matching-iterator)
[![downloads](http://img.shields.io/npm/dm/matching-iterator.svg?style=flat-square)](https://npmjs.org/package/matching-iterator)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/matching-iterator.svg?style=flat-square)](https://github.com/arlac77/matching-iterator/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Fmatching-iterator%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/matching-iterator/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/matching-iterator/badge.svg)](https://snyk.io/test/github/arlac77/matching-iterator)
[![Coverage Status](https://coveralls.io/repos/arlac77/matching-iterator/badge.svg)](https://coveralls.io/github/arlac77/matching-iterator)

# matching-iterator

glob style matching on iterables

# usage

```js
import { matcher } from "matching-iterator";

for await (const r of matcher([
    { name: "a" },{ name: "b" }], "a*", { name: "name" })) {
  console.log(r);
}
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [matcher](#matcher)
    *   [Parameters](#parameters)
*   [compile](#compile)
    *   [Parameters](#parameters-1)

## matcher

Match entries against glob pattern.

### Parameters

*   `entries` **Iterator<([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))>** input
*   `patterns` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** filter to apply
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

    *   `options.name` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** name of the name attribute
    *   `options.caseSensitive` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** defaults to true

Returns **Iterator<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** filtered entries

## compile

*   **See**: <https://stackoverflow.com/questions/869809/combine-regexp>

### Parameters

*   `patterns`  
*   `options`  

# install

With [npm](http://npmjs.org) do:

```shell
npm install matching-iterator
```

# license

BSD-2-Clause
