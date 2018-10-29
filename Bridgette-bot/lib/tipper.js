var web3 = require('./etherNode');
var dapp = require('../dapp');
var auth = require('../auth');
var botUnits = require('./botUnits');
const bot = require('./discordbot');
const Joi = require('joi');
const crypto = require('crypto');

//joi validation schema
const schema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  amount : Joi.number().integer().min(0).max(86753090).precision(0).required()
}).with('username', 'amount');


//contract
const ABI = dapp.btoken.abi;
const ADDR = dapp.btoken.address;

const tipper = new web3.eth.Contract(ABI, ADDR);

//useful functions
function hashStuff(dig){
   var hash = crypto.createHash('sha256');
   hash.update(dig);
   return hash.digest('hex');
}

async function addReactions(channelID, evt,emoji){
   bot.addReaction({
    channelID : channelID,
    messageID : evt.d.id,
    reaction : emoji
  });
}

module.exports = async (channelID, sender, senderID, args, evt ) => {

//format [tipper send xxx <to>]

 switch(args[0].toLowerCase()){
      case "send" :
        //add reaction to be polite
        addReactions(channelID, evt, '\u{1F916}');

        //convert to contract addreses
        var _to = "0x" + hashStuff(args[2]);
        var _from = "0x" + hashStuff('<@'+senderID+'>');

        const result = Joi.validate({ username: args[2], amount: args[1] }, schema)
        .catch(function(err){
          addReactions(channelID, evt, "\u{1F6D1}");
          console.log(err);
        });


       //unlock the account and send the transaction
        //await web3.eth.personal.unlockAccount(auth.account, auth.passwd);
        //console.log('acct unlocked');
        var gas = await tipper.methods.transfer(_from, _to, args[1]).estimateGas({from: auth.account});

        //console.log(gas);

        const msg = await tipper.methods.transfer(_from, _to, args[1]).send({
          from: auth.account,
          gas: Math.round(gas * 1.5),
          gasPrice: '50000000000'
        })
        .then(async function(receipt){
          await addReactions(channelID, evt, '\u{1F4B0}');
          console.log(receipt);
          }
         )
         .catch(function(err){
           addReactions(channelID, evt, "\u{1F6D1}");
           console.log(err);
         });

        return true;

        break;

    //* !tipper balance *//
      case "balance":
        addReactions(channelID, evt, "\u{1F916}");
        if(args[1] == null){
         var account = "0x" + hashStuff("<@"+ senderID+">");
          } else {
          var account = "0x" + hashStuff(args[1]);
          }
          await tipper.methods.balanceOf(account).call()
            .then( res => {
              //console.log(res);
              //addReactions(channelID, evt, "\u{1F4B0}");
              bot.sendMessage({
                 to: channelID,
                message :  sender + ", the balance is "+ res
              });
            return true;
        });


        break;

        };

      };
