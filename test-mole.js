/* global window, global */
(function (root) {
  'use strict';

  function noop() {}

  var isTestingEnvironment = (function isTesting() {
    return typeof root.describe === 'function' &&
      typeof root.it === 'function';
  }());

  root.tm = root.testMole = {};

  // console.log('is testing?', isTestingEnvironment);
  if (isTestingEnvironment) {
    root.testMole.describe = root.describe;
    root.testMole.it = root.it;
    root.testMole.expect = root.expect;
  } else {
    root.testMole.describe = root.testMole.it = root.testMole.expect = noop;
  }

}(typeof window === 'object' ? window : global));
