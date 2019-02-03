var assert = require('assert');

//* unit under test *//
const { tipper } = require( "../dapps" );

var sendCase = {
  channelID : "12345",
  sender : "bob",
  senderID : "123456789",
  args : ['send','100', '<@213456>'],
  evt: { 'd' : { 'id' : "12345"}}
};

var balCase = {
  channelID : "12345",
  sender : "bob",
  senderID : "123456789",
  args : ['balance', '<@213456>'],
};

//format [tipper send xxx <to> & !tipper balance
module.exports =
describe('tipper module', function() {
      //check error statements
      it('returns false on bad username', async function() {
        var res = await tipper(sendCase.channelID, sendCase.sender, sendCase.senderID, [sendCase.args[0],sendCase.args[1],'bob'], sendCase.evt );
        assert.equal(res, 'ValidationError', ' returns error');
      });
      it('returns false on bad amount', async function() {
        var res = await tipper(sendCase.channelID, sendCase.sender, sendCase.senderID, [sendCase.args[0],'-100',sendCase.args[2]], sendCase.evt );
        assert.equal(res, 'ValidationError', ' returns error');
      });
      //try to catch error from web3
  });
