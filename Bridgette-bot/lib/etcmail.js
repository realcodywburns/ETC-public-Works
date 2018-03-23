// based on bot made by the ellisiam team

var web3 = require('./etherNode');
var dapp = require('../dapp');
var auth = require('../auth');
var bot = require('../bot');

const ABI = dapp.a2a.abi;
const ADDR = dapp.a2a.address;

const a2a = new web3.eth.Contract(ABI, ADDR);


module.exports = async (channelID, sender,  args) => {
  var messageBody = {
        "from" : "",
        "text" : "",
    "bridgette": " | This message was delivered by Bridgette. Please do not reply to her address | "
  }

  switch(args[0]){
      case "send" :
        messageBody.from = args[1];
        messageBody.text = args[2];

        var rawMsg = messageBody.from + messageBody.text + messageBody.bridgette;
        web3.eth.personal.unlockAccount(auth.account, auth.passwd);
        const msg = await a2a.methods.sendMessage(args[3], rawMsg).send({
          from: auth.account,
          gas: '90000',
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
      case "count":
        const last = await a2a.methods.lastIndex(args[1]).call()
          .then( res => {
           if(res != undefined){
            console.log(res);
            return "Account `" + args[1].substring(0,10) + "` has " + res + " messages.";
          } else {
            return "Account `" + args[1].substring(0,10) + "` has no messages."
          };
        });
        return{
          to: channelID,
          message :  last
        };
        break;
      case "fetch":
        const index = await a2a.methods.getMessageByIndex(args[2], args[1]).call()
          .then( res => {
            return  "``` message: "+ args[1] + "\n"
                      + "-------------------------- \n"
                      + "\n"
                      + "From: " + res[0] + "\n"
                      + "Timestamp:" + res[2] + "\n"
                      + "Msg: " + res[1] + "\n"
                      + "```"

          });
          return{
            to: channelID,
            message :  index
          };
           break;
        case "new":
          const latest = await a2a.methods.getLastMessage(args[1]).call()
            .then( res => {
              return  "``` Latest: \n"
                        + "-------------------------- \n"
                        + "\n"
                        + "From: " + res[0] + "\n"
                        + "Timestamp:" + res[2] + "\n"
                        + "Msg: " + res[1] + "\n"
                        + "```"
            });
            return{
              to: channelID,
              message :  fetch
            };
          break;
        };
    };
