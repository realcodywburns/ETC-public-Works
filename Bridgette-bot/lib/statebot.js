var web3 = require('./etherNode');
var dapp = require('../dapp');

var abiArray = dapp.statebot.abi;
var contractAddress = dapp.statebot.address;
module.exports = new web3.eth.Contract(abiArray, contractAddress);
