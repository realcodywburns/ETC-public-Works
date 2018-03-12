var assert = require('assert');

//* unit under test *//
var test = require('../../lib/bridgette');


module.exports = describe('greeter', function() {
      it('returns greeting', function() {
        var res = test('123');
        assert.equal(res.to, '123', 'test returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'im an error', 'error returns correct message');
    });
  });
