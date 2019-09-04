const { log } = require('../common');

log.debug('[Bridgette-bot/lib/statebot] statebot loaded');

var rolebot = async function() {}

rolebot.isAllowed = function(submitter){
  return true;
};

rolebot.add = function(user){
  //rb.eth.method send a tx
  return true;
};

module.exports = rolebot;
