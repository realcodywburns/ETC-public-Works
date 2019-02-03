var assert = require('assert');

//* unit under test *//
const { donate } = require( "../dapps" );

//!donate <team> <percent(whole number)> <your address>
module.exports =
describe('donate module', function() {
  //check error statements
  it('returns correct error statement if too many args', async function() {
    var res = await donate('123', 'sender', ['0', '1', '2', '3']);
    assert.equal(res.to, '123', ' returns correct channel');
    assert.equal(res.message, 'Something went wrong', 'error returns correct message');
  });
  
  it('returns correct error statement if given an invalid group', async function() {
    var res = await donate('123', 'sender', ['badgroup', '1', '2']);
    assert.equal(res.to, '123', ' returns correct channel');
    assert.equal(res.message, 'Invalid group.', 'error returns correct message');
  });
  
  it('returns correct error statement if given an invalid percent', async function() {
    var res = await donate('123', 'sender', ['community', '100', '2']);
    assert.equal(res.to, '123', ' returns correct channel');
    assert.equal(res.message, 'Invalid percent.', 'error returns correct message');
  });
  
  it('returns correct error statement if given an invalid owner address', async function() {
    var res = await donate('123', 'sender', ['community', '10', '0x2']);
    assert.equal(res.to, '123', ' returns correct channel');
    assert.equal(res.message, 'Invalid owner address.', 'error returns correct message');
  });
      //try to catch error from web3

});
