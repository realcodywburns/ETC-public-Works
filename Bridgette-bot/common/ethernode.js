const log = require('./logger');

log.info('[Bridgette-bot/common/web3] web3 loaded');
//* Web3 information *//
var Web3 = require('web3');
module.exports = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB3_URL));
