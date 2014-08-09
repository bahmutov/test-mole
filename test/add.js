if (typeof require === 'function') {
  require('../test-mole');
  require('lazy-ass');
}

/* global testMole */
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
    if (isNumber(a) && isNumber(b)) {
      return a + b;
    }
    return 'arguments should be numbers';
  };
}());

console.log(add(2, 3));
