module.exports = (channelID, blockNumber) => {
return{
  to: channelID,
  message :  "The current block height is: " + blockNumber + "\n"
  + " There are " + (8772000 - blockNumber) + " blocks until the Atlantis fork"
  };
};
