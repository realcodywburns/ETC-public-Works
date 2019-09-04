var dapp = require('./dapp');
const Joi = require('joi');
const crypto = require('crypto');

const { bot, log, web3 } = require('../common');

var bottoken = require('../../contracts/build/contracts/bottoken.json');


//joi validation schema
const schema = Joi.object().keys({
  username: Joi.string().regex(/^<@([0-9_\-\.]+)>$/).required(),
  amount : Joi.number().integer().min(0).max(86753090).precision(0).required()
}).with('username', 'amount');


//contract
const ABI = bottoken.abi;
const ADDR = dapp.bottoken.address;

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

        var result = await Joi.validate({ username: args[2], amount: args[1] }, schema)
               .catch(async function(err){
                 addReactions(channelID, evt, "\u{1F6D1}");
                 return err.name;
               });

               if(result == 'ValidationError'){
                 await addReactions(channelID, evt, "\u{1F6D1}");
                 return result;
                 break;
               };


        //convert to contract addreses
        var _to = "0x" + hashStuff(args[2]);
        var _from = "0x" + hashStuff('<@'+senderID+'>');



       //unlock the account and send the transaction
        await web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW)
        .catch( err => {
         addReactions(channelID, evt, "\u{1F6D1}");
         log.error('[Bridgette-bot/lib/tipper] unlock account error: '+ err);
        });

        //console.log('acct unlocked');
        var gas = await tipper.methods.transfer(_from, _to, args[1]).estimateGas({from: process.env.BRIDGETTE_ADDRESS})
        .catch( err => {
         addReactions(channelID, evt, "\u{1F6D1}");
         log.error('[Bridgette-bot/lib/tipper] transfer estimate error: '+ err);
        });

        //console.log(gas);
        addReactions(channelID, evt, "\u{23f3}");
        const msg = await tipper.methods.transfer(_from, _to, args[1]).send({
          from: process.env.BRIDGETTE_ADDRESS,
          gas: Math.round(gas * 1.5),
          gasPrice: '50000000000'
        })
        .then(async function(receipt){
          await addReactions(channelID, evt, '\u{1F4B0}');
          log.debug('[Bridgette-bot/lib/tipper] transfer receipt: '+ receipt);
          })
         .catch(function(err){
           addReactions(channelID, evt, "\u{1F4B0}"); //\u{1F6D1} until evm error is resolved
           log.error('[Bridgette-bot/lib/tipper] transfer error ' + err);
         });
        return true;
        break;

    //* !tipper balance *//
      case "balance":
        //addReactions(channelID, evt, "\u{1F916}");
        if(args[1] == null){
         var account = "0x" + hashStuff("<@"+ senderID+">");
          } else {
          var account = "0x" + hashStuff(args[1]);
          }
        await tipper.methods.balanceOf(account).call()
        .then( res => {
              bot.sendMessage({
                to: channelID,
                message :  sender + ", the balance is "+ res
              });
            })
        .catch( err =>{
                addReactions(channelID, evt, "\u{1F6D1}");
                log.error('[Bridgette-bot/lib/tipper] balance error ' + err);
              });
        return true;
        break;

        case "deposit":

        var account = "0x" + hashStuff("<@"+ senderID+">");
        await addReactions(channelID, evt, '\u{1F916}');

        //unlock the account and send the transaction
         await web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW)
         .catch( err => {
          addReactions(channelID, evt, "\u{1F6D1}");
          log.error('[Bridgette-bot/lib/tipper] unlock account error: '+ err);
         });

         var gas = await tipper.methods.newDeposit(account).estimateGas({from: process.env.BRIDGETTE_ADDRESS})
         .catch( err => {
          addReactions(channelID, evt, "\u{1F6D1}"); //error sign
          log.error('[Bridgette-bot/lib/tipper] transfer estimate error: '+ err);
         });

         addReactions(channelID, evt, "\u{23f3}"); //clock
         const dep = await tipper.methods.newDeposit(account).send({
           from: process.env.BRIDGETTE_ADDRESS,
           gas: Math.round(gas * 1.5),
           gasPrice: '50000000000'
         })
         .then(async function(receipt){
           await addReactions(channelID, evt, '\u{1F4B0}');
           bot.sendMessage({
             to: channelID,
             message :  sender + ", your deposit address is: \` "+ res +"\`"
           });
           log.debug('[Bridgette-bot/lib/tipper] deposit receipt: '+ receipt.events[0].address);
           })
          .catch(function(err){
            //addReactions(channelID, evt, "\u{1F4B0}"); //\u{1F6D1} until evm error is resolved
            //temp solution until parity bug is solved
            addReactions(channelID, evt, '\u{1F4B0}');
            bot.sendMessage({
              to: channelID,
              message :  sender + ", your deposit address is: \` "+ err.events[0].address +"\`"
            });

            log.error('[Bridgette-bot/lib/tipper] deposit error ' + err);
          });

         return true;
         break;

      case "withdraw" :
      //!tipper withdraw 100 0x12345

      var account = "0x" + hashStuff("<@"+ senderID+">");
      await addReactions(channelID, evt, '\u{1F4B0}'); //robothead

      //unlock the account and send the transaction
       await web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW)
       .catch( err => {
        addReactions(channelID, evt, "\u{1F6D1}"); //error sign
        log.error('[Bridgette-bot/lib/tipper] unlock account error: '+ err);
       });

       //estimate gas
      var gas = await tipper.methods.withdraw(account, args[1], args[2]).estimateGas({from: process.env.BRIDGETTE_ADDRESS})
      .catch( err => {
       addReactions(channelID, evt, "\u{1F6D1}"); //error sign
       log.error('[Bridgette-bot/lib/tipper] transfer estimate error: '+ err);
      });

      addReactions(channelID, evt, "\u{23f3}"); //clock
      const wit = await tipper.methods.withdraw(account, args[1], args[2]).send({
        from: process.env.BRIDGETTE_ADDRESS,
        gas: Math.round(gas * 1.5),
        gasPrice: '50000000000'
      })
      .then(async function(receipt){
        await addReactions(channelID, evt, '\u{1F4B0}');
        log.debug('[Bridgette-bot/lib/tipper] withdrawl receipt: '+ receipt);
        })
       .catch(function(err){
         addReactions(channelID, evt, "\u{1F4B0}"); //\u{1F6D1} until evm error is resolved
         log.error('[Bridgette-bot/lib/tipper] withdrawal error ' + err);
       });
      return true;
      break;


//end
  };
};
