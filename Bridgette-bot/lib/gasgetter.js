var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

log.debug('[Bridgette-bot/lib/gasgetter] gasgetter loaded');

module.exports = (_contractAddr, _data) => {
  web3.eth.estimateGas({
    web3.eth.estimateGas({
      to: _contractAddr,
      data: _data
  })
  .then(console.log)
  .catch((err) => {
    return err;
  }
}
