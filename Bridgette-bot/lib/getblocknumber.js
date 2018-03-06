module.exports = (channelID, blockNumber) => {
return{
  to: channelID,
  message :  "The current block height is: " + blockNumber + "\n"
  + " Calisto Snapshot happened " + (blockNumber - 5500000) + " blocks ago. \n"
  + " There are " + (5900000 - blockNumber) + " blocks until the ECIP 1041 fork"
  };
};
