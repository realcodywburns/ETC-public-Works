const { log, web3 } = require('../common');

log.debug('[Bridgette-bot/lib/statebot] statebot loaded');

var dapp = require('./dapp');

var abiArray = dapp.statebot.abi;
var contractAddress = dapp.statebot.address;
module.exports = new web3.eth.Contract(abiArray, contractAddress);
