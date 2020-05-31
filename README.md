[![npm](https://img.shields.io/npm/v/matching-iterator.svg)](https://www.npmjs.com/package/matching-iterator)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/matching-iterator)](https://bundlephobia.com/result?p=matching-iterator)
[![downloads](http://img.shields.io/npm/dm/matching-iterator.svg?style=flat-square)](https://npmjs.org/package/matching-iterator)
[![Build Status](https://travis-ci.com/arlac77/matching-iterator.svg?branch=master)](https://travis-ci.com/arlac77/matching-iterator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/matching-iterator.git)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/matching-iterator/badge.svg)](https://snyk.io/test/github/arlac77/matching-iterator)
[![codecov.io](http://codecov.io/github/arlac77/matching-iterator/coverage.svg?branch=master)](http://codecov.io/github/arlac77/matching-iterator?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/matching-iterator/badge.svg)](https://coveralls.io/r/arlac77/matching-iterator)

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

# install

With [npm](http://npmjs.org) do:

```shell
npm install matching-iterator

```

# license

BSD-2-Clause
