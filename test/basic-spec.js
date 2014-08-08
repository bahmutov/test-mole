if (typeof require === 'function') {
  require('../test-mole');
  require('lazy-ass');
  var check = require('check-types');
}

/* global testMole */
lazyAss(check.object(testMole), 'missing testMole');


