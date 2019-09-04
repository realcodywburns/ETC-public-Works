const { log, web3 } = require('../common');

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
};
