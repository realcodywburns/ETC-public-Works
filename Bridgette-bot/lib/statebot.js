var web3 = require('../common/etherNode');
var botUnits = require('../common/botUnits');
const bot = require('../common/discord');
const log = require('../common/logger');

log.debug('[Bridgette-bot/lib/statebot] statebot loaded');

var dapp = require('../dapp');

var abiArray = dapp.statebot.abi;
var contractAddress = dapp.statebot.address;
module.exports = new web3.eth.Contract(abiArray, contractAddress);
