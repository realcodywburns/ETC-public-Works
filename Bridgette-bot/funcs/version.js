const { log } = require('../common');

log.debug('[Bridgette-bot/lib/version] version loaded');

var pkg = require('../../package.json');

module.exports = (channelID) => {
return{
  to: channelID,
  message : "I am running version: `" + pkg.version  + "`"
  };
};
