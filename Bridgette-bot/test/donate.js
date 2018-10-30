var assert = require('assert');

//* unit under test *//
var donate = require('../lib/donate');

//!donate <team> <percent(whole number)> <your address>
module.exports =
describe('donate module', function() {
      //check error statements
      it('returns correct error statement if too many args', function() {
        var res = donate('123', 'sender', '0 1 2 3');
        assert.equal(res.to, '123', ' returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'Something went wrong', 'error returns correct message');
      });
      it('returns correct error statement if given an invalid group', function() {
        var res = donate('123', 'sender', 'badgroup 1 2');
        assert.equal(res.to, '123', ' returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'Invalid group.', 'error returns correct message');
      });
      it('returns correct error statement if given an invalid percent', function() {
        var res = donate('123', 'sender', 'community 100 2');
        assert.equal(res.to, '123', ' returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'Invalid percent.', 'error returns correct message');
      });
      it('returns correct error statement if given an invalid owner address', function() {
        var res = donate('123', 'sender', 'community 10 0x2');
        assert.equal(res.to, '123', ' returns correct channel');
        assert.equal(res.message, 'Oops: '+ 'Invalid owner address.', 'error returns correct message');
      });
      //try to catch error from web3
  });