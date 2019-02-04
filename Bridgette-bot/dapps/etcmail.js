const { botUnits, log, web3 } = require('../common');

log.debug('[Bridgette-bot/lib/etcmail] etcmail loaded');

var dapp = require('./dapp');

const ABI = dapp.a2a.abi;
const ADDR = dapp.a2a.address;

const a2a = new web3.eth.Contract(ABI, ADDR);


module.exports = async (channelID, sender,  args) => {

  var messageBody = {
        "from" : "",
        "text" : "",
    "bridgette": "| This message was delivered by Bridgette. Please do not reply to her address | "
  }

  const panic = {
      to: channelID,
      message : "Something went wrong"
    };


  switch(args[0].toLowerCase()){
      case "send" :
        var _to = findAddr(args);
        if (_to.addr == 0){return panic};
        messageBody.from = sender;
        for(i = _to.startint ; i < args.length; i++){
        messageBody.text = messageBody.text + args[i] + " ";
          }
        var rawMsg = "From: "+ messageBody.from + "\n"
                      + messageBody.text + "\n"
                      + messageBody.bridgette;
        web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW);
        var gas = await a2a.methods.sendMessage(args[_to.addr], rawMsg).estimateGas({from: process.env.BRIDGETTE_ADDRESS});
        const msg = await a2a.methods.sendMessage(args[_to.addr], rawMsg).send({
          from: process.env.BRIDGETTE_ADDRESS,
          gas: Math.round(gas * 1.5),
          gasPrice: '20000000000'
        })
        .then( res => {
          return "@"+ sender + ", your message has been sent!"
        })
        .catch((err) => {
        return err
        });
        return  {
          to: channelID,
          message : msg
        }
        break;

    //* get message count *//
      case "count":
        var _to = findAddr(args);
        if (_to.addr == 0){return panic};
        const last = await a2a.methods.lastIndex(args[_to.addr]).call()
          .then( res => {
           if(res != undefined){
            console.log(res);
            return "Account `" + args[_to.addr].substring(0,10) + "` has " + res + " messages.";
          } else {
            return "Account `" + args[_to.addr].substring(0,10) + "` has no messages."
          };
        });
        return{
          to: channelID,
          message :  last
        };
        break;
      //* get message by number *//

      case "fetch":
        if( args[1] < 1 ||  args[2] == undefined ){
          var _to = findAddr(args);
          if (_to.addr == 0){return panic};
          args[2] = args[_to.addr];
          args[1] = await a2a.methods.lastIndex(args[_to.addr]).call();
        }
        const index = await a2a.methods.getMessageByIndex(args[2], args[1]).call()
          .then( res => {
            var datetime = botUnits.formatDate(res[2]);
            return  "``` message: "+ args[1] + "\n"
                      + "-------------------------- \n"
                      + "\n"
                      + "Sender: " + res[0] + "\n"
                      + "Timestamp:" + datetime + "\n"
                      + res[1] + "\n"
                      + "```"
          });
          return{
            to: channelID,
            message :  index
          };
           break;
        case "new":
          var _to = findAddr(args);
          if (_to.addr == 0){return panic};
          const latest = await a2a.methods.getLastMessage(args[_to.addr]).call()
            .then( res => {
              var datetime = botUnits.formatDate(res[2]);
              //console.log("this "+datetime);
              return  "``` Latest: \n"
                        + "-------------------------- \n"
                        + "\n"
                        + "Sender: " + res[0] + "\n"
                        + "Timestamp: " + datetime + "\n"
                        + res[1] + "\n"
                        + "```"
            });
            return{
              to: channelID,
              message :  latest
            };
          break;
        };
      return panic;
    };


function findAddr(args){
  if(args[1] != "" && args[1] != undefined &&  web3.utils.isAddress(args[1])) {
      return {
        addr : 1,
        startint : 2};
    } else if (web3.utils.isAddress(args[2])) {
      return {
        addr : 2,
        startint : 3 };

    } else {
    return {
      addr : 0,
      startint : 0 };
  }
}
