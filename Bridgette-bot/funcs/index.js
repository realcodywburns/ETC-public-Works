// common functions
const { log } = require('../common');

var getBlockNumber = require('./getblocknumber');
var getBalance = require('./getBalance');
var getTransaction = require('./getTransactions');
var sendSignedTransaction = require('./sendSignedTransaction')
var getGasPrice = require('./getGasPrice');
var getBlock = require('./getBlock');
var version = require('./version');
var error = require('./error');

log.info('[Bridgett-bot/funcs/index.js] functions loaded');

module.exports = {
    getBlockNumber : getBlockNumber,
    getBalance : getBalance,
    getTransaction : getTransaction,
    sendSignedTransaction : sendSignedTransaction,
    getGasPrice : getGasPrice,
    getBlock : getBlock,
    version : version,
    error : error,
}

// copy paste 
// const { getBlockNumber, getBalance, getTransaction, sendSignedTransaction, getGasPrice, getBlock, version, error } = require( "./funcs" );