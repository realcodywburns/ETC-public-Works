var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

log.debug('[Bridgette-bot/lib/version] version loaded');

var pkg = require('../../package.json');

module.exports = (channelID) => {
return{
  to: channelID,
  message : "I am running version: `" + pkg.version  + "`"
  };
};
