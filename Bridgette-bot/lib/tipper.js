var web3 = require('./etherNode');
var dapp = require('../dapp');
var auth = require('../auth');
var botUnits = require('./botUnits');
const bot = require('./discordbot');


const crypto = require('crypto');

//contract
const ABI = dapp.btoken.abi;
const ADDR = dapp.btoken.address;

const tipper = new web3.eth.Contract(ABI, ADDR);

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


//tipper send xxx <to>


 switch(args[0].toLowerCase()){
      case "send" :
        //add reaction to be polite
        //addReactions(channelID, evt, '🤖');

        //convert to contract addreses
        var _to = "0x" + hashStuff(args[1]);
        var _from = "0x" + hashStuff('<@'+senderID+'>');

       //unlock the account and send the transaction
        //await web3.eth.personal.unlockAccount(auth.account, auth.passwd);
        //console.log('acct unlocked');
        var gas = await tipper.methods.transfer(_from, _to, args[2]).estimateGas({from: auth.account});
        //console.log(gas);
        if(args[2] != null){
          var amt = args[2];
        } else {
          var amt = args[3];
        }
        const msg = await tipper.methods.transfer(_from, _to, amt).send({
          from: auth.account,
          gas: Math.round(gas * 1.5),
          gasPrice: '50000000000'
        })
        .then(async function(receipt){
          await addReactions(channelID, evt, '🤖');
          console.log(receipt);
          }
         )
         //⛏️
         .catch(function(err){
           addReactions(channelID, evt, "⚠️");
           console.log(err);
         });
        return true;

        break;

    //* !tipper balance *//
      case "balance":
        addReactions(channelID, evt, "🤖");
        if(args[1] == null){
         var account = "0x" + hashStuff("<@"+ senderID+">");
          } else {
          var account = "0x" + hashStuff(args[1]);
          }
          await tipper.methods.balanceOf(account).call()
            .then( res => {
              //console.log(res);
              addReactions(channelID, evt, "💰");
              bot.sendMessage({
                 to: channelID,
                message :  sender + ", the balance is "+ res
              });
            return true;
        });


        break;

        };

      };
