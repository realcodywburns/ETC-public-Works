var web3 = require('./etherNode');
var dapp = require('../dapp');
var auth = require('../auth');
var botUnits = require('./botUnits')
var


const crypto = require('crypto');
const hash = crypto.createHash('sha256');

//contract
const ABI = dapp.btoken.abi;
const ADDR = dapp.btoken.address;

const btoken = new web3.eth.Contract(ABI, ADDR);

function hashStuff(dig){
   hash.update(dig);
   return hash.digest('hex');
}

module.exports = async (channelID, sender,  args) => {


//tipper send xxx <to>

  const panic = {
      to: channelID,
      message : "Something went wrong"
    };


  switch(args[0].toLowerCase()){
      case "send" :
        var _to = hashStuff(args[2]);
        var _from = hashStuff(sender);
        console.log("to: " + to);
        const last =await btoken.methods.transfer(_from, _to, args[1]).call()
        .then( res => {
          if(res){
          console.log(res);
          return sender + ", your transaction is complete "+ res;
        }
      );
        return{
          to: channelID,
          message :  last
        };
        break;

    //* !tipper balance *//
      case "balance":

        const last =await btoken.methods.balance(hashStuff(sender)).call()
          .then( res => {
            console.log(res);
            return sender + ", your current balance is "+ res;
        });

        return{
          to: channelID,
          message :  last
        };
        break;

        };
      return panic;
    };


}
