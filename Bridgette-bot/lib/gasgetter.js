var web3 = require('./etherNode');

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
