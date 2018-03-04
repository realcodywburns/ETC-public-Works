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
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var payload = args[1];
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'web3':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hi! I\'m Bridgette the ETC web3 bot. To find out what I can do check out: https://github.com/realcodywburns/ETC-public-Works/blob/master/Bridgette-bot/README.MD '
                });
            break;
            // Just add any case commands if you want to..
            case 'getBlockNumber':
              web3.eth.getBlockNumber().then(
              blockNumber => {
                bot.sendMessage({
                    to: channelID,
                    message: "The current block height is: " + blockNumber
                });
              });
            break;
            case 'getBalance':
             if(payload != undefined){
              web3.eth.getBalance(payload).then(
              Balance => {
                bot.sendMessage({
                    to: channelID,
                    message: "The balance at account " + payload + " is: " + Balance * .000000000000000001
                });
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
                bot.sendMessage({
                    to: channelID,
                    message: "Transaction info: \n"
                      + "  hash: " + transaction.hash + "\n"
                      + "  nonce: " + transaction.nonce + "\n"
                      + "  blockHash: " + transaction.blockHash + "\n"
                      + "  blockNumber: " + transaction.blockNumber + "\n"
                      + "  transactionIndex: " + transaction.transactionIndex + "\n"
                      + "  from: " + transaction.from + "\n"
                      + "  to: " + transaction.to + "\n"
                      + "  value: " + transaction.value + "\n"
                      + "  gasPrice: " + transaction.gasPrice + "\n"
                      + "  gas: " + transaction.gas + "\n"
                      + "  input: " + transaction.input
                });
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Get transaction requires a txId (i.e. !getTransaction <txId>)"
              });
            }
            break;
            case 'sendRawTransaction':
             if(payload != undefined){
              web3.eth.sendSignedTransaction(payload)
              .then( (hash) => {
                bot.sendMessage({
                    to: channelID,
                    message: "Transaction Hash is: " + hash
                });
              }).catch((err) => {
                bot.sendMessage({
                    to: channelID,
                    message: "Oops: " + err
                });
              });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "Send Raw Tx requires a signed transaction (i.e. !sendRawTransaction <0xdeadbeef>)"
              });
            }
            break;

         }
     }
});
