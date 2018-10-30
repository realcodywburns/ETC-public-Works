var assert = require('assert');

//* unit under test *//
var donate = require('../lib/donate');

//!donate <team> <percent(whole number)> <your address>
module.exports =
describe('donate module', function() {
      it('returns correct error statement if too many args', function() {
        var res = donate('123', 'sender', '0 1 2 3');
        assert.equal(res.to, '123', ' returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'Something went wrong', 'error returns correct message');
    });
  });
