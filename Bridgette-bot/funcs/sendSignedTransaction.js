module.exports = (channelID, hash) => {
return{
    to: channelID,
    message: "Transaction Hash is: `" + hash.transactionHash + " `"
  };
};
