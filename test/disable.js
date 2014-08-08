if (typeof require === 'function') {
  require('../lazy-test');
  require('lazy-ass');
  var check = require('check-types');
}

/* global lazyTest, lt */

lazyTest.disable();
lazyAss(check.object(lazyTest), 'missing lazyTest');
lazyAss(check.object(lt), 'missing lt');

lazyTest.options.verbose = true;
lazyTest.options.debug = true;

lazyTest.it('test 1 works fine', function () {
  lazyAss(2 + 2 === 4);
});

console.log('sync action 1');

lazyTest.it('test 2 works fine', function () {
  lazyAss(2 + 2 === 4);
});

console.log('sync action 2');

lazyTest.start(100);
// multiple starts should do nothing
lazyTest.start();
lazyTest.start();

setTimeout(function () {
  console.log('basic-spec finished');
}, 100);

console.log('sync action 3');

lazyTest.it('test 3 throws an exception', function () {
  lazyAss(2 + 2 === 5, '2 + 2 === 5 on purpose');
});
