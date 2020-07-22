var tape = require('tape');
import fib from '../src/fib.js';

tape('Adding two string of numbers, "0" and "0", returns "0"', function(assert) {
  assert.equal(fib.sumTwoStrings('0', '0', '0'), '0');
  assert.end();
});

tape('Adding "9" and "3" returns "12"', function(assert) {
  assert.equal(fib.sumTwoStrings('9', '3', '0'), '12');
  assert.end();
});

tape('Adding "12" and "28" returns "40"', function(assert) {
  assert.equal(fib.sumTwoStrings('12', '28', '0'), '40');
  assert.end();
});

tape('Adding "299" and "432" returns "731"', function(assert) {
  assert.equal(fib.sumTwoStrings('299', '432', '0'), '731');
  assert.end();
});

tape('When given index is 0, fib returns 0 as string', function(assert) {
  assert.equals(fib.getNumberAt(0), '0');
  assert.end();
});

tape('When given index is 1, fib returns 1 as string', function(assert) {
  assert.equal(fib.getNumberAt(1), '1');
  assert.end();
});

tape('When given index is 2, fib returns 1 as string', function(assert) {
  assert.equal(fib.getNumberAt(2), '1');
  assert.end();
});

tape('When given index is 3 fib returns 2 as string', function(assert) {
  assert.equal(fib.getNumberAt(3), '2');
  assert.end();
});

tape('When given index is 11 fib returns 89 as string', function(assert) {
  assert.equal(fib.getNumberAt(11), '89');
  assert.end();
});

tape('When given index is 50 fib returns 12586269025 as string', function(assert) {
  assert.equal(fib.getNumberAt(50), '12586269025');
  assert.end();
});

tape('When given index is 100 fib returns 354224848179261915075 as string', function(assert) {
  assert.equal(fib.getNumberAt(100), '354224848179261915075');
  assert.end();
});
