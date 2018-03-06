var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var Web3 = require('web3');

// basic information about the dapp
var uri = 'http://127.0.0.1:8545';
//var uri =  'https://mewapi.epool.io';


var web3 = new Web3(new Web3.providers.HttpProvider(uri));


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

//functoins
var bridgette = require('./lib/bridgette');
var getBlockNumber = require('./lib/getBlockNumber');
var getBalance = require('./lib/getBalance');
var getTransaction = require('./lib/getTransactions');
var sendSignedTransaction = require('./lib/sendSignedTransaction')
var getGasPrice = require('./lib/getGasPrice');
var getBlock = require('./lib/getBlock');
var error = require('./lib/error');


bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var payload = args[1];

        args = args.splice(1);
        switch(cmd) {
            case 'web3':
                bot.sendMessage(bridgette(channelID));
              break;

            case 'getBlockNumber':
              web3.eth.getBlockNumber()
              .then(blockNumber => {
                bot.sendMessage(getBlockNumber(channelID, blockNumber));
                  }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

            case 'getBalance':
             if(payload != undefined && web3.utils.isAddress(payload)){
              web3.eth.getBalance(payload)
              .then( balance => {
                bot.sendMessage(getBalance(channelID, payload, balance));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get balance requires an account number (i.e. !getBalance <0xaccount>)"
              });
            }
            break;

            case 'getTransaction':
             if(payload != undefined){
              web3.eth.getTransaction(payload).then(
              transaction => {
                bot.sendMessage(getTransaction(channelID, payload, transaction));
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction requires a txId (i.e. !getTransaction <txId>)"
              });
            }
            break;

            case 'sendSignedTransaction':
             if(payload != undefined){
              web3.eth.sendSignedTransaction(payload)
              .then( hash => {
                bot.sendMessage(sendSignedTransaction(channelID, hash))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Send Raw Tx requires a signed transaction (i.e. !sendRawTransaction <0xdeadbeef>)"
              });
            }
            break;

            case 'gasPrice' :
            web3.eth.getGasPrice()
            .then(gas => {
              bot.sendMessage(getGasPrice(channelID, gas))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
            break;

            case 'getBlock':
             if(payload != undefined){
              var funcs = args[2];
              web3.eth.getBlock(payload)
              .then( rawBlk => {
                bot.sendMessage(getBlock(channelID, funcs, rawBlk))
              }).catch((err) => {
                bot.sendMessage(error(channelID, err))
              });
              } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction requires a txId (i.e. !getTransaction <txId>)"
              });
            }
            break;

}
     }
});
