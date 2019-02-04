module.exports = (channelID, blockNumber) => {
return{
  to: channelID,
  message :  "The current block height is: " + blockNumber 
  };
};
