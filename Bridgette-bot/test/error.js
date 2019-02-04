var assert = require('assert');

//* unit under test *//
const { error } = require( "../funcs" );

module.exports =
describe('error reporting', function() {
  it('returns correct error statement', function() {
    var res = error('123', 'im an error');
    assert.equal(res.to, '123', 'error returns correct channel');
    assert.equal(res.message, 'Oops: '+ 'im an error', 'error returns correct message');
  });
});
