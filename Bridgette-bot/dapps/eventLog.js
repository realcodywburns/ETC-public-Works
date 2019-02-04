const { web3 } = require('../common');

var dapp = require('./dapp');

const ABI = dapp.eventLog.abi;
const ADDR = dapp.eventLog.address;

const eventLog = new web3.eth.Contract(ABI, ADDR);



module.exports = async (channelID, sender,  args) => {

  var eventReport = [];

  const panic = {
      to: channelID,
      message : "Something went wrong"
    };

  var getLength = await eventLog.methods.totalEvents().call();
  //console.log(getLength);

  for(i = 1; i <= getLength; i++){
    const index = await eventLog.methods.getEvent(i).call();
    eventReport.push(index);
  }
/* Event Sorting */

/* build team list */
var teams = [];
//console.log(eventReport.length);
for(i = 0; i < eventReport.length; i++){
  for(n = 0; n <= teams.length+1; n++){
    if(eventReport[i]._team == teams[n]){
      break;
    }
    if(n == teams.length){
      teams.push(eventReport[i]._team);
      break;
    }
    //console.log(n);
  }
}
/*end team list */

/*build team reports*/

var data = [];
var blockNumber = await web3.eth.getBlockNumber();

for(i =0; i < teams.length; i++){
  data.push(teams[i]);
  data.push("-------------");
  for(n = 0; n < eventReport.length; n++){
    if(eventReport[n]._team == teams[i]){
        if (eventReport[n]._block != undefined && eventReport[n]._block > blockNumber) {
          var blockCount = eventReport[n]._block - blockNumber;
          eventData = eventReport[n]._title + "\n     When: " + eventReport[n]._block  + " (" +blockCount + " blocks)" ;
        } else if (eventReport[n]._block != undefined){
          eventData = eventReport[n]._title + "\n     When: " + eventReport[n]._date ;
        } else {
        eventData = eventReport[n]._title + "\n     When: To Be Announced" ;
      }
      data.push(eventData);
      //console.log(eventReport[n]._title);
    }
  }
  data.push("\n");
}

  //console.log(data.join("\n"));
  //console.log(teams);
  //console.log(eventReport[0]);

  return  {
      to: channelID,
      message : "```.oO[ Upcoming Events in the ETC Ecosystem ]Oo. \n \n" + data.join("\n") +"\n Please note dates are subject to change and are only provided as an estimate. Security always takes priority. \nEvent contract address: " + ADDR +" ```"
    };
}
