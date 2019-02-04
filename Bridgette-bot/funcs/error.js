const { log } = require('../common');

log.debug('[Bridgette-bot/lib/error] error loaded');


module.exports = (channelID, err) => {
  return {
    to: channelID,
    message: "Oops: " + err
  };
};
