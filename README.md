# test-mole

> Test inside javascript closures by sneaking a mole

[![Build status][test-mole-ci-image] ][test-mole-ci-url]
[![dependencies][test-mole-dependencies-image] ][test-mole-dependencies-url]
[![devdependencies][test-mole-devdependencies-image] ][test-mole-devdependencies-url]

Properly written JavaScript is hard to test because most of the code
is hidden inside closures. For example, we cannot directly test
the inner function `isNumber` in this example:

```js
var add = (function () {
  function isNumber(x) {
    return typeof x === 'number';
  }

  return function add(a, b) {
    if (isNumber(a) &&
      isNumber(b))
      return a + b;
    return 'arguments should be numbers';
  };
}());
```

We can maybe move `isNumber` to another library, but often our logic is too specific.
We are left with testing `isNumber` indirectly via `add` or by playing various tricks
to relax the access rules. We could make inner functions used by a constructor function
by [inspecting the constructor's source](http://www.htmlgoodies.com/html5/javascript/accessing-private-functions-in-javascript-nested-functions.html). The solution is ugly and brittle.

## Inject test mole

Instead of exporting inner functions to make them callable from unit tests, I am
proposing the opposite. Inject *test mole* into your code that will have full access
to the private code, but will do nothing in production mode.

Example:

```js
// include test-mole.js first
// source.js
var add = (function () {
  function isNumber(x) {
    return typeof x === 'number';
  }

  testMole.it('returns true for numbers', function () {
    lazyAss(isNumber(1), '1');
    lazyAss(isNumber(-10), '-10');
  });

  testMole.it('returns false for strings', function () {
    lazyAss(!isNumber('foo'), 'foo');
    lazyAss(!isNumber('2'), '2');
  });

  return function add(a, b) {
    if (isNumber(a) &&
      isNumber(b))
      return a + b;
    return 'arguments should be numbers';
  };
}());
```

I am using [lazy-ass](https://github.com/bahmutov/lazy-ass) assertions.

When running in production, `testMole` will not find `describe` or `it` functions,
so it will default its own methods to be `noop`. Your code will pay only for source code download
and compilation once. When running with the unit test environment, the `testMole.it` will
point at `window.it` provided by BDD framework.

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/test-mole/issues?state=open) on Github

## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[test-mole-icon]: https://nodei.co/npm/test-mole.png?downloads=true
[test-mole-url]: https://npmjs.org/package/test-mole
[test-mole-ci-image]: https://travis-ci.org/bahmutov/test-mole.png?branch=master
[test-mole-ci-url]: https://travis-ci.org/bahmutov/test-mole
[test-mole-dependencies-image]: https://david-dm.org/bahmutov/test-mole.png
[test-mole-dependencies-url]: https://david-dm.org/bahmutov/test-mole
[test-mole-devdependencies-image]: https://david-dm.org/bahmutov/test-mole/dev-status.png
[test-mole-devdependencies-url]: https://david-dm.org/bahmutov/test-mole#info=devDependencies
