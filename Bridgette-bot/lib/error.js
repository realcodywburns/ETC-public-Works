var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

log.debug('[Bridgette-bot/lib/error] error loaded');


module.exports = (channelID, err) => {
  return {
    to: channelID,
    message: "Oops: " + err
  };
};
