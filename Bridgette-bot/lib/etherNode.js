//* Web3 information *//
var Web3 = require('web3');
var uri = 'http://10.0.0.104:8545';
//var uri =  'https://mewapi.epool.io';
module.exports = new Web3(new Web3.providers.HttpProvider(uri));
//* end web3 *//
