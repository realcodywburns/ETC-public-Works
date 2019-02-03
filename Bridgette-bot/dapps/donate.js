// based on bot made by the ellisiam team
const { log, web3 } = require('../common');


log.debug('[Bridgette-bot/lib/donate] donate loaded');


var splitter = require('../../contracts/build/contracts/Split.json');

const BYTECODE = splitter.bytecode;
const ABI = splitter.abi;


const splitContract = new web3.eth.Contract(ABI);

// !donate <team> <percent(whole number)> <your address>
module.exports = async (channelID, sender,  args) => {
var botMessage = "";
if (args.length == 3) {
    donate = args[0];
    percent = parseInt(args[1]);
    owner = args[2];
  } else if (args.length == 2) {
    donate = "default";
    percent = parseInt(args[0]);
    owner = args[1];
  } else {
    log.error('[Bridgette-bot/lib/donate] invalid arg length. | CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
    return{
    to: channelID,
    message :  'Something went wrong'
    }
  }

  var donateAddr = "0x48dbDa9443746A99eF1b26aB01DD94aC50D7014b";

  if (donate === "community") {
    donateAddr = "0x0e7c045110b8dbf29765047380898919c5cb56f4";
  } else if (donate == "etcdev") {
    donateAddr = "0x0e7c045110b8dbf29765047380898919c5cb56f4";
  }else if (donate == "dex") {
    donateAddr = "0x52823e725a34d42e14a1b66fb67299C30c4d8Edf";
  } else if (donate == "epool") {
    donateAddr = "0xbe14b9f55d789efd5ee1c10cffd2d04e340b3b06";
  } else if (donate == "bcrd") {
    donateAddr = "0xCe5ED529977b08f87CBc207ebC216859820461eE";
  } else {
    log.error('[Bridgette-bot/lib/donate] invalid group | CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
    return{
    to: channelID,
    message :  'Invalid group.'
    }
  }

  if (!(percent >= 1 && percent <= 99)) {
    log.error('[Bridgette-bot/lib/donate] invalid percent | CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
    return{
    to: channelID,
    message :  'Invalid percent.'
    }
  }
  if (!web3.utils.isAddress(owner)) {
    log.error('[Bridgette-bot/lib/donate] invalid owner address | CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
    return{
    to: channelID,
    message :  'Invalid owner address.'
    }
  }

  //await message.reply(` We're creating the contract for you. Please wait...`);

  web3.eth.personal.unlockAccount(process.env.BRIDGETTE_ADDRESS, process.env.BRIDGETTE_PW);
  const newContractInstance = await splitContract.deploy({
      data: BYTECODE,
      arguments: [owner, donateAddr, percent],
    })
    .send({
      from: process.env.BRIDGETTE_ADDRESS,
      gas: '306106',
      gasPrice: '20000000000'
  })
  .then(function(newContractInstance){
    log.info('[Bridgette-bot/lib/donate] new contract instance | CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
      return newContractInstance;
    })
  .catch((err) => {
    log.error('[Bridgette-bot/lib/donate] contract creation error | err: '+ err +' CHID: ' + channelID + ' sender: ' + sender + ' args:' + args);
    return {
      to: channelID,
      message : err
    }
  });

return {
    to: channelID,
    message : '@'+ sender + ', your contract is ready at ' + newContractInstance.options.address +'.'
  }

}
