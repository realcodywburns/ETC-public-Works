var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

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
