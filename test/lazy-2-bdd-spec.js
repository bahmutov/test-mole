if (typeof require === 'function') {
  require('../lazy-test');
  require('../lazy-test-bdd');
}

it('runs by itself', function () {
  console.log('this test runs by itself without describe');
});

/* global lazyTest */
lazyTest.it('lazy test 1 test', function () {
  console.log('should be run by BDD tester');
});
